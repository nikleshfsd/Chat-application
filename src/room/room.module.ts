import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from '../database/mongoDB/schemas/room.schema';

@Module({
  providers: [RoomService],
  controllers: [RoomController],
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  exports: [RoomService],
})
export class RoomModule {}
