import { Room } from '../../chat/entity/room.entity';
import { Message } from '../../chat/entity/message.entity';
import { BaseEntity } from '../../common/entity/base.entity';
import { Column, Entity, ManyToMany, OneToMany, Unique } from 'typeorm';
import { ConnectedUser } from '../../chat/entity/connected-user.entity';

@Entity({ name: 'user' })
@Unique(['email'])
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @ManyToMany(() => Room, (room) => room.participants)
  rooms: Room[];

  @OneToMany(() => ConnectedUser, (connectedUser) => connectedUser.user)
  connectedUsers: ConnectedUser[];

  @OneToMany(() => Message, (message) => message.creator)
  messages: Message[];
}
