import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JoinRoomDto } from './dto/join-room.dto';
import { Room } from '../../database/mongoDB/schemas/room.schema';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}

  async joinRoom(joinRoomDto: JoinRoomDto) {
    const roomSchema = new Room();
    roomSchema.name = joinRoomDto.name;

    const userName = joinRoomDto.connectedUser;
    const userId = uuidv4();
    const room = await this.roomModel.findOne({
      name: joinRoomDto.name,
    });

    if (!room) {
      const roomSchema = new Room();
      roomSchema.name = joinRoomDto.name;
      roomSchema.connectedUsers = [{ name: userName, userId, socketId: null }];
      const { _id: roomId } = await this.roomModel.create(roomSchema);
      return { roomId, userId };
    } else {
      const connectedUsers = [{ name: userName, userId, socketId: null }];
      const { _id: roomId } = await this.roomModel.findOneAndUpdate(
        { name: joinRoomDto.name },
        { $push: { connectedUsers } },
      );

      return { roomId, userId, roomName: joinRoomDto.name };
    }
  }
}
