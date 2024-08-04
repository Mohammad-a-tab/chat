import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { Room } from './entities/room.entity';
import { Message } from './entities/message.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectedUser } from './entities/connected-user.entity';
import { RoomParticipantsUser } from './entities/room-participants-user.entity';
import { RoomService } from './services/room.service';
import { MessageService } from './services/message.service';
import { ConnectedUserService } from './services/connected-user.service';

@Module({
  providers: [ChatGateway, RoomService, MessageService, ConnectedUserService],
  imports: [
    TypeOrmModule.forFeature([
      Message,
      Room,
      ConnectedUser,
      RoomParticipantsUser,
    ]),
    UserModule,
  ],
})
export class ChatModule {}
