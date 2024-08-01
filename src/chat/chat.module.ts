import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { Room } from './entities/room.entity';
import { Message } from './entities/message.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectedUser } from './entities/connected-user.entity';
import { RoomParticipantsUser } from './entities/room-participants-user';

@Module({
  providers: [ChatGateway],
  imports: [
    TypeOrmModule.forFeature([
      Room,
      Message,
      ConnectedUser,
      RoomParticipantsUser,
    ]),
    UserModule,
  ],
})
export class ChatModule {}
