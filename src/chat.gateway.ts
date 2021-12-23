import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './database/mongoDB/schemas/room.schema';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { formatMessage } from './utils';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server;

  private logger: Logger = new Logger(ChatGateway.name);

  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}

  afterInit() {
    this.logger.log('Initialize ChatGateway!');
  }

  async handleDisconnect(client: Socket) {
    const socketId = client.id;
    const room = await this.roomModel.findOne({
      'room.connectedUser.socketId ': socketId,
    });

    const user = room.connectedUsers.find(
      (element) => element.socketId === socketId,
    );

    if (!user || !room) {
      return;
    }

    await this.roomModel.findOneAndUpdate(
      { 'room.connectedUser.socketId ': socketId },
      {
        $pull: {
          connectedUser: {
            socketId: socketId,
          },
        },
      },
    );

    this.server
      .to(room.name)
      .emit(
        'message',
        formatMessage(user.name, `${user.name} has left the chat.`),
      );
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, { userId, roomId }) {
    const room = await this.roomModel.findOne({ _id: roomId });

    if (!room) return;

    const user = room.connectedUsers.find((user) => user.userId === userId);
    if (!user) return;

    user.socketId = client.id;
    await this.roomModel.findOneAndUpdate({ _id: roomId }, room);

    client.join(room.name);

    client.emit(
      'message',
      formatMessage(user.name, `Welcome ${user.name} in PYPESTREAM chat.`),
    );

    client
      .to(room.name)
      .emit('message', formatMessage(user.name, `${user.name} Joined.`));
  }

  @SubscribeMessage('chatToServer')
  async chatToServer(_: Socket, payload) {
    try {
      const roomchat = await this.roomModel.findOne({ _id: payload.roomId });
      const user = roomchat.connectedUsers.find(
        (user) => user.userId === payload.userId,
      );

      //store chat message
      const room = await this.roomModel.findOneAndUpdate(
        { _id: payload.roomId },
        {
          $push: {
            messages: {
              userId: user.userId,
              content: payload.message,
              createdAt: new Date(),
            },
          },
        },
      );

      this.server
        .to(room.name)
        .emit('message', formatMessage(user.name, payload.message));
    } catch (err) {
      this.logger.error(
        `Event: chatToServer, Error: [${err.message}]`,
        err.stack,
      );
    }
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: Socket, data) {
    try {
      const room = await this.roomModel.findOne({ _id: data.roomId });
      const userIndex = room.connectedUsers.findIndex(
        (connectedUser) => connectedUser.userId === data.userId,
      );

      const [userLeft] = room.connectedUsers.splice(userIndex, 1);
      await this.roomModel.findOneAndUpdate({ _id: data.roomId }, room);
      client.leave(room.name);

      this.server
        .to(room.name)
        .emit(
          'message',
          formatMessage(userLeft.name, `${userLeft.name} has left the chat.`),
        );

      client.emit('redirect', '/');
    } catch (err) {
      this.logger.error(`Event: leaveRoom, Error: [${err.message}]`, err.stack);
    }
  }
}
