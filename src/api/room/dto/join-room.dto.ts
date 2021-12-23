import { IsNotEmpty } from 'class-validator';

export class JoinRoomDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  connectedUser: string;
}
