import { IsNotEmpty } from 'class-validator';

export class JoinRoomDto {
  @IsNotEmpty()
  name: string;
  connectedUser: string;
}
