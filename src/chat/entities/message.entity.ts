// import { Room } from './room.entities';
// import { User } from '../../user/entities/user.entities';
// import { BaseEntity } from '../../common/entities/base.entities';
// import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
//
// @Entity({ name: 'message' })
// export class Message extends BaseEntity {
//   @Column()
//   roomId: string;
//
//   @Column()
//   text: string;
//
//   @ManyToOne(() => Room, (roomEntity) => roomEntity.messages)
//   room: Room;
//
//   @Column()
//   createdBy: string;
//
//   @Column()
//   updatedBy: string;
//
//   // @ManyToOne(() => User, (user) => user.messages)
//   // @JoinColumn([{ name: 'createdBy', referencedColumnName: 'id' }])
//   // creator: User;
// }
