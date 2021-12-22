import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { mongooseConfiguration } from './database/mongoDB/config/mongoose.config';
import { RoomModule } from './room/room.module';
import { Room, RoomSchema } from './database/mongoDB/schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      mongooseConfiguration().getConnectionUrl(),
      mongooseConfiguration().options,
    ),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    RoomModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}
