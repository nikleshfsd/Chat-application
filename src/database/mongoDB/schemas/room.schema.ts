import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  connectedUser: [
    {
      userId: string;
      userName: string;
    },
  ];

  @Prop()
  Message: [];
}

export const RoomSchema = SchemaFactory.createForClass(Room).set('timestamps', {
  createdAt: true,
  updatedAt: true,
});
