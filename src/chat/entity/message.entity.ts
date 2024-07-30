import { Room } from './room.entity';
import { User } from '../../user/entity/user.entity';
import { BaseEntity } from '../../common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'message' })
export class Message extends BaseEntity {
  @Column()
  roomId: string;

  @Column()
  text: string;

  @ManyToOne(() => Room, (roomEntity) => roomEntity.messages)
  room: Room;

  @Column()
  createdBy: string;

  @Column()
  updatedBy: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn([{ name: 'createdBy', referencedColumnName: 'id' }])
  creator: User;
}
