import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { Token, User } from '@project/core';
import { jwtConfig } from '@project/account-config';
import { createJWTPayload } from '@project/helpers';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) { }

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, name, avatar, password } = dto;
    const blogUser = { email, name, avatar, passwordHash: '' };
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);
    await this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async changePassword(id: string, dto: ChangePasswordDto) {
    const { currentPassword, newPassword } = dto;
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    if (!(await existUser.comparePassword(currentPassword))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    await existUser.setPassword(newPassword);

    await this.blogUserRepository.update(existUser);

    return existUser;
  }

  public async toggleSubscription(followerId: string, followingId: string) {
    const follower = await this.blogUserRepository.findById(followerId);

    if (!follower) {
      throw new NotFoundException(`User with id ${followerId} not found`);
    }

    const following = await this.blogUserRepository.findById(followingId);

    if (!following) {
      throw new NotFoundException(`User with id ${followingId} not found`);
    }

    if (follower.subscriptions.includes(followingId)) {
      follower.subscriptions = follower.subscriptions.filter((id) => id !== followingId);
      following.subscribersCount--;
    } else {
      follower.subscriptions.push(followingId);
      following.subscribersCount++;
    }

    await Promise.all([
      this.blogUserRepository.update(follower),
      this.blogUserRepository.update(following),
    ]);

    return follower;
  }

  public async incrementPostsCount(userId: string) {
    const existUser = await this.blogUserRepository.findById(userId);

    if (!existUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    existUser.postsCount++;
    await this.blogUserRepository.update(existUser);
  }

  public async decrementPostsCount(userId: string) {
    const existUser = await this.blogUserRepository.findById(userId);

    if (!existUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    existUser.postsCount--;
    await this.blogUserRepository.update(existUser);
  }
}
