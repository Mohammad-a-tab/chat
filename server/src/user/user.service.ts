import {
  Logger,
  Injectable,
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto, UserDto, CreateUserDto } from './dto';
import { sanitizeUser } from '../common/helpers/sanitize-user';
import { RemoveResponse } from 'src/types/remove-response.type';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = this.userRepository.create(createUserDto);
      return sanitizeUser(await this.userRepository.save(user));
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findOne(userId: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: String(userId),
        },
      });

      if (!user) {
        this.logger.warn(`User with ID "${userId}" not found`);
        throw new NotFoundException(`User with ID "${userId}" not found`);
      }

      return sanitizeUser(user);
    } catch (error) {
      this.logger.error(`Failed to find user: ${error.message}`, error.stack);
      throw new NotFoundException(`Failed to find user with ID "${userId}"`);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        this.logger.warn(`User with email "${email}" not found`);
        throw new NotFoundException(`User with email "${email}" not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      this.logger.error('Failed to find user by mail', error.stack);
      throw new InternalServerErrorException(
        'Failed to find user by mail',
        error,
      );
    }
  }

  async findUserByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        this.logger.warn(`User with username "${username}" not found`);
        throw new NotFoundException(
          `User with username "${username}" not found`,
        );
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      this.logger.error('Failed to find user by username', error.stack);
      throw new InternalServerErrorException(
        'Failed to find user by username',
        error,
      );
    }
  }

  async findAll(): Promise<UserDto[]> {
    try {
      const users = await this.userRepository.find();
      return users.map((user) => sanitizeUser(user));
    } catch (error) {
      this.logger.error(
        `Failed to retrieve all users: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to retrieve all users');
    }
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      const user = await this.findOne(userId);

      if (!user) {
        this.logger.warn(`User with ID "${userId}" not found`);
        throw new NotFoundException(`User with ID "${userId}" not found`);
      }

      Object.assign(user, updateUserDto);
      return sanitizeUser(await this.userRepository.save(user));
    } catch (error) {
      this.logger.error(`Failed to update user: ${error.message}`, error.stack);

      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        `Failed to update user with ID "${userId}"`,
      );
    }
  }

  async remove(userId: string): Promise<RemoveResponse> {
    try {
      const user = await this.findOne(userId);

      if (!user) {
        this.logger.warn(`User with ID "${userId}" not found`);
        throw new NotFoundException(`User with ID "${userId}" not found`);
      }

      await this.userRepository.delete({ id: user.id });

      return {
        status: HttpStatus.OK,
        description: 'The user has been successfully deleted.',
      } as RemoveResponse;
    } catch (error) {
      this.logger.error(`Failed to remove user: ${error.message}`, error.stack);

      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        `Failed to remove user with ID "${userId}"`,
      );
    }
  }
}
