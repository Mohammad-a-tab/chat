import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    UserModule,
    JwtModule.register({ global: true }),
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
