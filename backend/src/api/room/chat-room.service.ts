import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JoinRoomDto } from './dto/join-room.dto';
import { Room } from '../../database/mongoDB/schemas/room.schema';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JoinRoomResponse } from '../../../src/types';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}

  async joinRoom(joinRoomDto: JoinRoomDto): Promise<JoinRoomResponse> {
    const roomSchema = new Room();
    roomSchema.name = joinRoomDto.name;

    const userName = joinRoomDto.connectedUser;
    const userId = uuidv4();

    let room = await this.roomModel.findOne({
      name: joinRoomDto.name,
    });

    if (!room) {
      const roomSchema = new Room();
      roomSchema.name = joinRoomDto.name;
      roomSchema.messages = [];
      room = await this.roomModel.create(roomSchema);
    }

    const connectedUsers = [{ name: userName, userId, socketId: null }];
    room = await this.roomModel.findOneAndUpdate(
      { name: joinRoomDto.name },
      { $push: { connectedUsers } },
    );

    const joinRoomResponse: JoinRoomResponse = {
      roomId: room._id,
      userId,
      roomName: joinRoomDto.name,
    };

    return joinRoomResponse;
  }
}
