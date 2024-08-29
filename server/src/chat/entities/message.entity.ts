import { Room } from './room.entity';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'message' })
export class Message extends BaseEntity {
  @Column()
  roomId: string;

  @Column()
  text: string;

  @Column()
  type: string;

  @ManyToOne(() => Room, (roomEntity) => roomEntity.messages)
  room: Room;

  @Column()
  to: string;

  @Column()
  from: string;

  @Column()
  createdBy: string;

  @Column()
  updatedBy: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn([{ name: 'createdBy', referencedColumnName: 'id' }])
  creator: User;
}
