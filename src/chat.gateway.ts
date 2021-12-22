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

@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}
  @WebSocketServer()
  server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    console.log('Initialize ChatGateway!');
  }
  async handleDisconnect(client: Socket, data) {
    const socketId = client.id;
    const roomUserToBeDelete = await this.roomModel.findOne({
      'room.connectedUser.socketId ': socketId,
    });
    const user = roomUserToBeDelete.connectedUser.find(
      (element) => element.socketId === socketId,
    );
    const room = await this.roomModel.findOneAndUpdate(
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
    console.log(`Client disconnected: ${client.id}`);
  }
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, data) {
    console.log(client.id);
    const room = await this.roomModel.findOne({ _id: data.roomId });
    const user = room.connectedUser.find(
      (element) => element.userId === data.userId,
    );
    user.socketId = client.id;

    const roomChat = await this.roomModel.findOneAndUpdate(
      { _id: data.roomId },
      room,
    );

    client.join(room.name);
    client.emit(
      'message',
      formatMessage(
        user.name,
        `Welcome ${user.name} in PYPESTREAM chat.`,
      ),
    );

    client
      .to(room.name)
      .emit(
        'message',
        formatMessage(user.name, `${user.name} Joined.`),
      );
  }

  @SubscribeMessage('chatMsgText')
  async chatMsgText(client: Socket, message) {
    try {
      const roomchat = await this.roomModel.findOne({ _id: message.roomId });
      const user = roomchat.connectedUser.find(
        (element) => element.userId === message.userId,
      );
      //store chat message
      const room = await this.roomModel.findOneAndUpdate(
        { _id: message.roomId },
        {
          $push: {
            messages: {
              userId: user.userId,
              content: message.msgText,
              createdAt: new Date(),
            },
          },
        },
      );
      // console.log(`room data `, user.name);
      this.server
        .to(room.name)
        .emit('message', formatMessage(user.name, message.msgText));
    } catch (err) {
      console.log(err);
    }
  }

  @SubscribeMessage('leaveRoomByInterface')
  async leaveRoomByInterface(client: Socket, data) {
    try {
      const room = await this.roomModel.findOne({ _id: data.roomId });
      const connectedUser = room.connectedUser;

      const userIndex = connectedUser.findIndex(
        (element) => element.userId === data.userId,
      );
      const userLeft = room.connectedUser.splice(userIndex, 1);

      console.log(`this is not conuser`, connectedUser);
      console.log(`updated user`, room);

      const roomChat = await this.roomModel.findOneAndUpdate(
        { _id: data.roomId },
        room,
      );
      client.leave(room.name);

      this.server
        .to(room.name)
        .emit(
          'message',
          formatMessage(
            userLeft[0].name,
            `${userLeft[0].name} has left the chat.`,
          ),
        );
      client.emit('redirect', '/');
    } catch (err) {}
  }
}
const formatMessage = (name, textMsg) => {
  const date = new Date();
  const hrs = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hrs >= 12 ? 'PM' : 'AM';
  const time = `${hrs}:${minutes} ${ampm}`;
  return {
    name,
    textMsg,
    time,
  };
};
