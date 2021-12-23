import {
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
import {
  ChatToServerPayload,
  JoinRoomPayload,
  LeaveRoomPayload,
} from './types';
import { utc } from 'moment';

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

    if (!room) return;

    const user = room.connectedUsers.find(
      (connectedUser) => connectedUser.socketId === socketId,
    );

    if (!user) return;

    await this.roomModel.findOneAndUpdate(
      { 'room.connectedUsers.socketId ': socketId },
      {
        $pull: {
          connectedUsers: {
            socketId,
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
  async joinRoom(client: Socket, payload: JoinRoomPayload) {
    const room = await this.roomModel.findOne({ _id: payload.roomId });

    // when the chat room does not exists.
    if (!room) return;

    const user = room.connectedUsers.find(
      (connectedUser) => connectedUser.userId === payload.userId,
    );

    // when the given user id does not exists.
    if (!user) return;

    user.socketId = client.id;
    await this.roomModel.findOneAndUpdate({ _id: payload.roomId }, room);

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
  async chatToServer(_: Socket, payload: ChatToServerPayload) {
    try {
      const roomchat = await this.roomModel.findOne({ _id: payload.roomId });
      const user = roomchat.connectedUsers.find(
        (connectedUser) => connectedUser.userId === payload.userId,
      );

      const room = await this.roomModel.findOneAndUpdate(
        { _id: payload.roomId },
        {
          $push: {
            messages: {
              userId: user.userId,
              content: payload.message,
              createdAt: utc().toDate(),
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
  async leaveRoom(client: Socket, payload: LeaveRoomPayload) {
    try {
      const room = await this.roomModel.findOne({ _id: payload.roomId });
      const userIndex = room.connectedUsers.findIndex(
        (connectedUser) => connectedUser.userId === payload.userId,
      );

      const [userLeft] = room.connectedUsers.splice(userIndex, 1);
      await this.roomModel.findOneAndUpdate({ _id: payload.roomId }, room);
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
