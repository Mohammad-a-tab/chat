import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Room } from './room.entity';

@Entity({ name: 'roomParticipantsUser' })
export class RoomParticipantsUser extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  roomId: string;

  @Column({ type: 'varchar', nullable: false, default: 'null' })
  createdBy: string;

  @Column({ type: 'varchar', nullable: false, default: 'null' })
  updatedBy: string;

  @ManyToOne(() => User, (user) => user.rooms)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Room, (room) => room.participants)
  @JoinColumn({ name: 'roomId' })
  room: Room;
}
