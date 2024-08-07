import {
  Entity,
  Column,
  Unique,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'room' })
@Unique(['name'])
export class Room extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column()
  type: string;

  @ManyToMany(() => User, (user) => user.rooms)
  @JoinTable({
    name: 'roomParticipantsUser',
    joinColumn: {
      name: 'roomId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  participants: User[];

  @Column({ nullable: true })
  capacity: number;

  @Column()
  createdBy: string;

  @Column()
  updatedBy: string;

  @ManyToOne(() => User, (user) => user.maidRooms)
  admin: User;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
