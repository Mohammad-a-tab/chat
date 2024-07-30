import { User } from '../../user/entity/user.entity';
import { BaseEntity } from '../../common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'connectedUser' })
export class ConnectedUser extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  socketId: string;

  @ManyToOne(() => User, (user) => user.connectedUsers)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
