import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Message } from './entities/message.entity';
import { RoomService } from './services/room.service';
import { MessageService } from './services/message.service';
import { ConnectedUser } from './entities/connected-user.entity';
import { ConnectedUserService } from './services/connected-user.service';
import { RoomParticipantsUser } from './entities/room-participants-user.entity';

@Module({
  providers: [ChatGateway, RoomService, ConnectedUserService, MessageService],
  imports: [
    TypeOrmModule.forFeature([
      Room,
      ConnectedUser,
      Message,
      RoomParticipantsUser,
    ]),
    UserModule,
  ],
})
export class ChatModule {}
