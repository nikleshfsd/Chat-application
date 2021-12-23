import { Module } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomController } from './chat-room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from '../../database/mongoDB/schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],

  controllers: [ChatRoomController],
  providers: [ChatRoomService],
})
export class ChatRoomModule {}
