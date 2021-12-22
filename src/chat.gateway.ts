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

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, data) {
    const room = await this.roomModel.findOne({ _id: data.roomId });
    const user = room.connectedUser.find(
      (element) => element.userId === data.userId,
    );
    client.join(room.name);
    client.emit(
      'message',
      formatMessage(
        user.userName,
        `Welcome ${user.userName} in PYPESTREAM chat.`,
      ),
    );

    client
      .to(room.name)
      .emit(
        'message',
        formatMessage(user.userName, `${user.userName} Joined.`),
      );
  }

  @SubscribeMessage('chatMsgText')
  async chatMsgText(client: Socket, data) {
    try {
      const roomchat = await this.roomModel.findOne({ _id: data.roomId });
      const user = roomchat.connectedUser.find(
        (element) => element.userId === data.userId,
      );
      //store chat message
      const room = await this.roomModel.findOneAndUpdate(
        { _id: data.roomId },
        {
          $push: {
            Message: {
              userId: user.userId,
              message: data.msgText,
              time: new Date().toString(),
            },
          },
        },
      );
      // console.log(`room data `, user.userName);
      this.server
        .to(room.name)
        .emit('message', formatMessage(user.userName, data.msgText));
    } catch (err) {
      console.log(err);
    }
  }
  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: Socket, data) {
    try {
      const room = await this.roomModel.findOne({ _id: data.roomId });
      const connectedUser = room.connectedUser;

      const userIndex = connectedUser.findIndex(
        (element) => element.userId === data.userId,
      );
      const userLeft = room.connectedUser.splice(userIndex, 1);

      client.on('disconnect', async () => {
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
              userLeft[0].userName,
              `${userLeft[0].userName} has left the chat.`,
            ),
          );
      });
    } catch (err) {}
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
            userLeft[0].userName,
            `${userLeft[0].userName} has left the chat.`,
          ),
        );
      client.emit('redirect', '/');
    } catch (err) {}
  }
}
const formatMessage = (userName, textMsg) => {
  const date = new Date();
  const hrs = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hrs >= 12 ? 'PM' : 'AM';
  const time = `${hrs}:${minutes} ${ampm}`;
  return {
    userName,
    textMsg,
    time,
  };
};
