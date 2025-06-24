export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
  PasswordChanged: 'Password was successfully changed.',
  PasswordChangeError: 'Authentication failed or old password is wrong.',
  RefreshSuccess: 'Refresh and access tokens have been successfully updated.',
  RefreshError: 'Wrong refresh token',
  SubsciptionSucess: 'Subscribe or unsubscribe successfully.',
  JwtAuthError: 'JWT authentification failed.',
  PostsCountSuccess: 'Posts count has been successfully changed.',
  ServerError: 'Internal server error.',
} as const;

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
} as const;
