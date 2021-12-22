import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from '../database/mongoDB/schemas/room.schema';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const roomSchema = new Room();
    roomSchema.name = createRoomDto.name;
    const userName = createRoomDto.connectedUser;
    const userId = uuidv4();

    const room = await this.roomModel.findOne({
      name: createRoomDto.name,
    });

    if (!room) {
      console.log('created');
      const roomSchema = new Room();
      roomSchema.name = createRoomDto.name;
      roomSchema.connectedUsers = [{ name: userName, userId, socketId: null }];
      const { _id: roomId } = await this.roomModel.create(roomSchema);
      return { roomId, userId };
    } else {
      console.log('updated');
      const connectedUsers = [
        { userName: userName, userId, socketId: null },
      ];
      const { _id: roomId } = await this.roomModel.findOneAndUpdate(
        { name: createRoomDto.name },
        { $push: { connectedUsers: connectedUsers } },
      );
      return { roomId, userId };
    }
  }
}
