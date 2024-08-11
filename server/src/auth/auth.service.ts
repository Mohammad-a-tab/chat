import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { SignInDto, SignUpDto } from './dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { MailService } from '../mail/mail.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto';

const scrypt = promisify(scryptCallback);

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userService: UserService,
    private readonly emailService: MailService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto, res: Response) {
    try {
      const { password, ...userInfo } = signUpDto;
      let hashedPassword: string;

      try {
        const salt = randomBytes(parseInt(process.env.SALT_LENGTH));
        const derivedKey: any = await scrypt(password, salt, 32);
        hashedPassword = `${salt.toString('base64')}$${derivedKey.toString('base64')}`;
      } catch (error) {
        throw new HttpException(
          'Error hashing password',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newUser = await this.userService.create({
        ...userInfo,
        hashedPassword,
      });

      const { id, email, firstName, lastName, username } = newUser;

      const otp = Math.floor(Math.random() * 90000 + 10000);

      await this.cacheManager.set(username, otp, 1000);

      const data = {
        firstName,
        lastName,
        email,
        otp,
      };

      const test = this.emailService.verifyEmail(data);

      return res.json(test);
    } catch (error) {
      this.logger.error('An error occurred during signup.', error);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred during signup. Please try again later.',
      });
    }
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const { email, password } = signInDto;
    try {
      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        this.logger.warn(`Invalid email "${email}" or password`);
        throw new UnauthorizedException('Invalid mail or password');
      }

      const [saltBase64, hashBase64] = user.hashedPassword.split('$');
      const salt = Buffer.from(saltBase64, 'base64');
      const hashBuffer = Buffer.from(hashBase64, 'base64');
      const derivedKey: any = await scrypt(password, salt, 32);

      const passwordMatch = timingSafeEqual(derivedKey, hashBuffer);

      if (!passwordMatch) {
        this.logger.warn(`Invalid email "${email}" or password`);
        throw new UnauthorizedException('Invalid mail or password');
      }

      const { id } = user;
      const accessToken = this.generateAccessToken(String(id), email);
      const refreshToken = this.generateRefreshToken(String(id), email);

      await this.userService.update(String(id), { refreshToken });

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      const currentUser = await this.userService.findOne(String(user.id));
      return res.json({ accessToken, currentUser });
    } catch (error) {
      this.logger.error(`Sign-in failed: ${error.message}`, error.stack);
      res
        .status(401)
        .json({ message: 'Sign-in failed. Please try again later.' });
    }
  }

  async signOut(user: Partial<User>, res: Response) {
    if (!user || !user.id) {
      throw new UnauthorizedException('User identification is missing');
    }

    try {
      await this.userService.update(String(user.id), { refreshToken: null });
      res.clearCookie('jwt');
      return res.status(HttpStatus.OK).json({ message: 'Sign-out successful' });
    } catch (error) {
      this.logger.error('An error occurred during sign-out.', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred during sign-out. Please try again later.',
      });
    }
  }

  async refreshAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies['jwt'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });

      const user = await this.userService.findUserByEmail(decoded.email);

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newAccessToken = this.generateAccessToken(
        String(user.id),
        user.email,
      );
      const newRefreshToken = this.generateRefreshToken(
        String(user.id),
        user.email,
      );

      await this.userService.update(String(user.id), {
        refreshToken: newRefreshToken,
      });

      res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({
        accessToken: newAccessToken,
      });
    } catch (error) {
      this.logger.error('An error occurred during token refresh.', error);
      throw new UnauthorizedException('Failed to refresh access token');
    }
  }

  private generateAccessToken(id: string, email: string): string {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    return this.jwtService.sign(
      { id, email },
      { secret: ACCESS_TOKEN_SECRET, expiresIn: '1d' },
    );
  }

  private generateRefreshToken(id: string, email: string): string {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    return this.jwtService.sign(
      { id, email },
      { secret: REFRESH_TOKEN_SECRET, expiresIn: '1d' },
    );
  }
}
