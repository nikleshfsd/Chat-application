<p align="center">
  <h1>Chat Application</h1>
</p>

## Description

Chat Application is a system which is used to develop public room where people can come and chat with each other.

## What we want to achieve

- Ability to create public chat-room where people can come together and share their thoughts.
- Where user can also join the existing room and interact to other members.
- They can also leave the room at any time if they want.

<br>

## Prerequisite

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Running app with Docker

```bash
$ docker-compose up -d --build
```

## Running app without Docker

### Backend

```bash
$ npm i
```

### Setting up env files

You will be required to create an environment file and add the content in it (Similar to .env.example).

```
.env
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### Frontend

```bash
$ npm i
```

```bash
# development
$ npm run dev

# Build mode
$ npm run start
```

## Technologies Used :

### Frontend

- [NextJS](https://nextjs.org/)
- [Socket.io](https://socket.io/)

### Backend

- [NestJS](https://nestjs.com/)
- [Websocket](https://docs.nestjs.com/websockets/gateways)

## APIs

- [Postman Collection](https://www.postman.com/collections/a5275392c811617ac43a)

## Events

To implement the client for this chat you can use the below mention events.

- **JoinRoom**

  ```
  Payload:
  {
    roomId : string;
    UserId : string;
  }

  when user will join the room this event will be emitted from the client side with payload.
  ```

- **ChatToServer**

  ```
  Payload:
  {
    roomId : string;
    UserId : string;
    message : string;
  }

  This event will be emitted from client side when the will send the message in the room with request payload.
  ```

- **LeaveRoom**

  ```
  Payload:
  {
    roomId : string;
    UserId : string;
    message : string;
  }

  When the user leave the room this event will be emitted from client side with requested payload.
  ```

- **Message**

      ```
      Payload:
      {
        name : string;
        content : string;
        createdAt : timestamp
      }

      This event will be listent by client side when message will be emitted from server.
      ```

  <br>

## Screenshots

![Join Room](/frontend/screenshots/join-room.png)

![Chat Room](/frontend/screenshots/chat-room.png)

## Further Improvements

### Frontend

- Material UI
- Progressive Web Apps

### Backend

- End-to-end Encryption
- Message Delay and Unavailability
