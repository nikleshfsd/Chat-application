import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import socketInstance from '../utils/socket';

type Props = {
	userId: string;
	roomId: string;
	onConnected: any;
};

const socketEvents = {
	CHAT_TO_SERVER: 'chatToServer',
	LEAVE_ROOM: 'leaveRoom',
	JOIN_ROOM: 'joinRoom',
	MESSAGE: 'message',
	REDIRECT: 'redirect'
}

const useSocket = ({ userId, roomId, onConnected }: Props) => {

	const socket = socketInstance.getInstance();

	const [dataList, setdataList] = useState<Array<object> | []>([]);

	const send = (message: string, callback: Function) => {
		socket.emit(socketEvents.CHAT_TO_SERVER, { userId, roomId, message });
		callback();
	};

	const leaveRoom = () => {
		socket.emit(socketEvents.LEAVE_ROOM, { userId, roomId });
		socket.disconnect();
		location.assign('/');
	}

	useEffect((): any => {

		socket.emit(socketEvents.JOIN_ROOM, { userId, roomId });

		socket.on(socketEvents.MESSAGE, (newMessage: any) => {
			setdataList((messageList) => [...messageList, newMessage]);
			if (onConnected) {
				onConnected();
			}
		});

		return () => socket.disconnect();

	}, [userId, roomId]);

	return { send, dataList, leaveRoom };
}

export default useSocket;