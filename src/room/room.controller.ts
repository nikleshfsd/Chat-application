import { Body, Controller, Post } from '@nestjs/common';
import { Render } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly service: RoomService) {}

  @Post('create')
  @Render('chat')
  async create(@Body() createRoomDto: CreateRoomDto) {
    const roomData = this.service.create(createRoomDto);
    return roomData;
  }
}
