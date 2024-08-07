import { UserDto } from '../../user/dto';
import { User } from '../../user/entities/user.entity';

export const sanitizeUser = (user: User): UserDto => {
  const { hashedPassword, refreshToken, ...sanitizedUser } = user;
  return sanitizedUser;
};
