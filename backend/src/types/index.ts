interface BasePayload {
  userId: string;
  roomId: string;
}

export interface JoinRoomPayload extends BasePayload {}

export interface LeaveRoomPayload extends BasePayload {}

export interface ChatToServerPayload extends BasePayload {
  message: string;
}

export interface JoinRoomResponse extends BasePayload {
  roomName: string;
}
