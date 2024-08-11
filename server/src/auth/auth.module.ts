import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    UserModule,
    MailModule,
    JwtModule.register({ global: true }),
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
