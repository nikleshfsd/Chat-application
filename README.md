<p align="center">
  <h1>Chat Application</h1>
</p>


## Description

Chat Application is a system which is used to develop public room where people can come and chat with each other.

## Prerequisite
   - [Docker](https://www.docker.com/)
   - [Docker Compose](https://docs.docker.com/compose/)

## Setting up env files

You will be required to create an environment file and add the content in it (Similar to .env.example).

```
.env
```

## Running app with docker

```bash
$ docker-compose build # it will build the images from Dockerfile
$ docker-compose up # start the application using docker container
$ docker-compose up -d # start the application using docker container in the background
```

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

## Screenshots

  ![Join Room](/screenshots/join-room.jpg)


  ![Chat Room](/screenshots/chat-room.jpg)


## License

Chat Application is [MIT licensed](LICENSE).
