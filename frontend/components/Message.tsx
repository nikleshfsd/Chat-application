import React, { FC } from 'react';

import styles from '../styles/MessageBubble.module.css';
import dateTimeFormatter from '../utils/dateTimeFormatter';

type Message = {
  content: string;
  name: string;
  createdAt: Date;
  id: string;
};

type MessageType = {
  message: Message;
  userId: string;
};

const Message: FC<MessageType> = ({
  message: { id, content, name, createdAt },
  userId,
}) => {
  return (
    <div
      className={
        userId === id ? styles.messageContainer : styles.nonUserMessageContainer
      }
    >
      <span className={userId === id ? styles.username : styles.nonUsername}>
        {name}
      </span>
      <div
        className={
          userId === id
            ? styles.messageDateContainer
            : styles.nonUserMessageDateContainer
        }
      >
        <div
          className={
            userId === id ? styles.userChatMessage : styles.nonUserChatMessage
          }
        >
          {content}
        </div>
        <span className={userId === id ? styles.userDate : styles.nonUserDate}>
          {dateTimeFormatter(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Message;
