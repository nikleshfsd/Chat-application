import React, { FC } from 'react';

import styles from '../styles/Messages.module.css';

import Message from './Message';

type MessagesTypes = {
	messages: any[];
	userId: string;
};

const Messages: FC<MessagesTypes> = ({ messages, userId }) => {
	return (
		<div className={styles.messagesDivContainer}>
			{messages.map((msg) => (
				<Message key={msg.id} message={msg} userId={userId} />
			))}
		</div>
	);
};

export default Messages;
