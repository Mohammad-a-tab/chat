import {
  CreateRoomDto,
  UpdateRoomDto,
  AssignUsersDto,
  RoomDetailDto,
} from '../dto';
import { Room } from '../entities/room.entity';
import { WsException } from '@nestjs/websockets';
import { Repository, DataSource } from 'typeorm';
import { MessageService } from './message.service';
import { plainToInstance } from 'class-transformer';
import { Injectable, Logger } from '@nestjs/common';
import { Message } from '../entities/message.entity';
import { User } from '../../user/entities/user.entity';
import { sanitizeUser } from 'src/common/helpers/sanitize-user';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { RoomParticipantsUser } from '../entities/room-participants-user.entity';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectDataSource() private dataSource: DataSource,
    private readonly messageService: MessageService,
  ) {}

  async create(userId: string, createRoomDto: CreateRoomDto): Promise<Room> {
    const { participants, ...roomDetails } = createRoomDto;

    try {
      console.log({ type: createRoomDto.type, name: createRoomDto.name });
      const newRoom = this.roomRepository.create({
        ...roomDetails,
        createdBy: userId,
        updatedBy: userId,
      });

      console.log(newRoom);
      const savedRoom = await this.roomRepository.save(newRoom);

      if (participants && participants.length > 0) {
        participants.push(userId);
        await this.assignUsersToRoom(userId, {
          roomId: savedRoom.id,
          participants,
        });
      }

      this.logger.log(
        `Room with ID ${savedRoom.id} created successfully by User ID: ${userId}`,
      );
      return savedRoom;
    } catch (error) {
      this.logger.error(`Failed to create room: ${error.message}`, error.stack);
      throw new WsException('Error occurred while creating the room.');
    }
  }

  async findAll(): Promise<Room[]> {
    try {
      return await this.roomRepository.find({ relations: ['participants'] });
    } catch (error) {
      this.logger.error(
        `Failed to find all rooms: ${error.message}`,
        error.stack,
      );
      throw new WsException('Error occurred while retrieving rooms.');
    }
  }

  async findOne(userId: string, id: string): Promise<Room> {
    try {
      const room = await this.roomRepository.findOne({
        where: { id },
        relations: ['participants', 'participants.connectedUsers', 'messages'],
      });

      if (!room) {
        throw new WsException(`Room with ID "${id}" not found.`);
      }

      const isParticipant = room.participants.some(
        (participant) => participant.id === userId,
      );
      if (!isParticipant) {
        throw new WsException(
          `User with ID "${userId}" is not a participant of room with ID "${id}".`,
        );
      }

      room.participants = room.participants.map(
        (participant) => sanitizeUser(participant) as User,
      );

      return room;
    } catch (error) {
      this.logger.error(
        `Failed to find room with ID ${id} for user ID ${userId}: ${error.message}`,
        error.stack,
      );
      throw new WsException('Error occurred while retrieving the room.');
    }
  }

  async findByUserId(userId: string): Promise<RoomDetailDto[]> {
    try {
      const rooms = await this.roomRepository
        .createQueryBuilder('room')
        .innerJoin(
          'room.participants',
          'participant',
          'participant.id = :userId',
          { userId },
        )
        .leftJoinAndSelect('room.participants', 'allParticipants')
        .getMany();

      const roomDetailsList: RoomDetailDto[] = [];

      for (const room of rooms) {
        const lastMessageResult = await this.messageService.findByRoomId({
          roomId: room.id,
          first: 0,
          rows: 1,
        });

        const roomDetail = plainToInstance(RoomDetailDto, {
          ...room,
          lastMessage: lastMessageResult.total
            ? lastMessageResult.result[0]
            : null,
          participants: room.participants,
        });

        roomDetailsList.push(roomDetail);
      }

      return roomDetailsList;
    } catch (error) {
      this.logger.error(
        `Failed to find rooms for user ID ${userId}: ${error.message}`,
        { userId, errorStack: error.stack },
      );
      throw new WsException(
        'An error occurred while retrieving user rooms. Please try again later.',
      );
    }
  }

  async update(
    userId: string,
    roomId: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    const { name, participants } = updateRoomDto;

    try {
      const room = await this.roomRepository.findOne({ where: { id: roomId } });

      if (name !== undefined) {
        room.name = name;
      }

      if (participants !== undefined) {
        participants.push(userId);
        await this.assignUsersToRoom(userId, {
          roomId,
          participants,
        });
      }

      room.updatedBy = userId;
      const updatedRoom = await this.roomRepository.save(room);

      this.logger.log(
        `Room with ID ${roomId} updated successfully by User ID: ${userId}`,
      );
      return updatedRoom;
    } catch (error) {
      this.logger.error(
        `Failed to update room with ID ${roomId}: ${error.message}`,
        error.stack,
      );
      throw new WsException('Error occurred while updating the room.');
    }
  }

  async deleteRoom(roomId: string): Promise<void> {
    try {
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.delete(Message, { roomId: roomId });

        await transactionalEntityManager.delete(RoomParticipantsUser, {
          roomId: roomId,
        });

        const deletionResult = await transactionalEntityManager.delete(Room, {
          id: roomId,
        });

        if (deletionResult.affected === 0) {
          this.logger.warn(`Room with ID ${roomId} not found.`);
          throw new WsException(`Room with ID "${roomId}" not found.`);
        }

        this.logger.log(
          `Room with ID ${roomId} and all associated data deleted successfully.`,
        );
      });
    } catch (error) {
      this.logger.error(
        `Failed to delete room with ID ${roomId}: ${error.message}`,
        error.stack,
      );
      throw new WsException(
        'An error occurred while attempting to delete the room. Please try again.',
      );
    }
  }

  private async assignUsersToRoom(
    userId: string,
    assignUsersDto: AssignUsersDto,
  ): Promise<void> {
    try {
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        // Validate room existence
        const room = await transactionalEntityManager.findOne(Room, {
          where: { id: assignUsersDto.roomId },
        });

        if (!room) {
          throw new Error(
            `Room with ID ${assignUsersDto.roomId} does not exist.`,
          );
        }

        // Validate user existence
        const users = await transactionalEntityManager.findByIds(
          User,
          assignUsersDto.participants,
        );
        console.log(assignUsersDto.participants);
        if (users.length !== assignUsersDto.participants.length) {
          throw new Error('One or more users do not exist.');
        }

        // Delete existing participants
        await transactionalEntityManager.delete(RoomParticipantsUser, {
          roomId: assignUsersDto.roomId,
        });

        // Prepare new participants
        const participantsToAssign = assignUsersDto.participants.map(
          (participantId) => ({
            roomId: assignUsersDto.roomId,
            userId: participantId,
            createdBy: userId,
            updatedBy: userId,
          }),
        );

        // Insert new participants
        await transactionalEntityManager.save(
          RoomParticipantsUser,
          participantsToAssign,
        );

        this.logger.log(
          `Users assigned to room ${assignUsersDto.roomId} successfully.`,
        );
      });
    } catch (error) {
      this.logger.error(
        `Failed to assign users to room: ${error.message}`,
        error.stack,
      );
      throw new WsException(
        `Failed to assign users to the room: ${error.message}`,
      );
    }
  }
}
