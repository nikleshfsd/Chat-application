import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

class Message {
  content: string;
  createdAt: Date;
  userId: string;
}

@Schema()
export class Room {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  connectedUser: [
    {
      userId: string;
      name: string;
      socketId: string;
    },
  ];

  @Prop()
  messages: Message[];
}

export const RoomSchema = SchemaFactory.createForClass(Room).set('timestamps', {
  createdAt: true,
  updatedAt: true,
});
