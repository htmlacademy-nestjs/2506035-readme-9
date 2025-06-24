import { User } from './user.interface';

export interface AuthUser extends User {
  passwordHash: string;
  postsCount?: number;
  subscribersCount?: number;
  subscriptions?: string[];
  createdAt?: string;
}
