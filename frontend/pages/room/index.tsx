import { faShare, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useRef, useState } from 'react';

import Input from '../../components/Input';
import Messages from '../../components/Messages';
import { INPUT_CONSTANTS, KEYBOARD_CONSTANTS } from '../../constants';
import useSocket from '../../hooks/useSocket';
import styles from '../../styles/ChatRoom.module.css';
import scrollToBottom from '../../utils/scrollToBottom';

const ChatRoom: FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>('');

  const messageContainerDivRef = useRef(null);

  const messageContainerDiv = messageContainerDivRef?.current;

  const { userId, roomId, roomName } = router.query;

  const {
    send,
    dataList: messages,
    leaveRoom,
  } = useSocket({
    userId: userId?.toString()!,
    roomId: roomId?.toString()!,
    onConnected: scrollToBottom,
  });

  useEffect(() => {
    scrollToBottom(messageContainerDiv!);
  }, [messages, messageContainerDiv]);

  const sendMessage = (): void => {
    if (!message?.trim()) {
      return;
    }
    send(message, resetMessageField);
  };

  const resetMessageField = (): void => {
    setMessage('');
  };

  const messageChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMessage(e.target.value);
  };

  const keyPressHandler = (e: KeyboardEvent | any): void => {
    if (e?.key === KEYBOARD_CONSTANTS.ENTER && message) {
      sendMessage();
    }
  }

  const leaveRoomHandler = (): void => {
    leaveRoom();
  };

  return (
    <div className={styles.chatRoomContainer}>
      <div className={styles.Header}>
        <div className={styles.chatRoomText}>Chat Room</div>
        <div className={styles.roomName}>Room Name: {roomName}</div>
        <div className={styles.closeIcon}>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            color="white"
            size="2x"
            onClick={leaveRoomHandler}
          />
        </div>
      </div>
      <div ref={messageContainerDivRef} className={styles.chatMessageContainer}>
        <Messages messages={messages} userId={userId?.toString()!} />
      </div>
      <div className={styles.messageSendContainer}>
        <Input
          largeWidth={true}
          value={message}
          name={INPUT_CONSTANTS.MESSAGE}
          placeholder="Enter your message"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            messageChangeHandler(e)
          }
          onKeyPress={keyPressHandler}
        />
        <div className={styles.sendIcon}>
          <FontAwesomeIcon
            icon={faShare}
            size="2x"
            color="#012a70"
            fixedWidth
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
