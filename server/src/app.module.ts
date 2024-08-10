import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '',
      username: 'postgres',
      entities: [resolve('dist/**/*.entity.js')],
      database: 'chat',
      synchronize: true,
      // dropSchema: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    ChatModule,
    EmailModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
