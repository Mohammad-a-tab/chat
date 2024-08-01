import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  Unique,
} from 'typeorm';
import { Room } from '../../chat/entities/room.entity';
import { Message } from '../../chat/entities/message.entity';
import {ConnectedUser} from "../../chat/entities/connected-user.entity";

@Entity({ name: 'user' })
@Unique(['email'])
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  hashedPassword: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => Room, (room) => room.admin)
  maidRooms: Room[];

  @ManyToMany(() => Room, (room) => room.participants)
  rooms: Room[];

  @OneToMany(() => ConnectedUser, (connectedUser) => connectedUser.user)
  connectedUsers: ConnectedUser[];

  @OneToMany(() => Message, (message) => message.creator)
  messages: Message[];
}
