import { Body, Controller, Post } from '@nestjs/common';
import { Render } from '@nestjs/common';
import { JoinRoomDto } from './dto/join-room.dto';
import { ChatRoomService } from './chat-room.service';

@Controller('chat-room')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Post('join')
  @Render('chat')
  async joinRoom(@Body() joinRoomDto: JoinRoomDto) {
    return this.chatRoomService.joinRoom(joinRoomDto);
  }
}
