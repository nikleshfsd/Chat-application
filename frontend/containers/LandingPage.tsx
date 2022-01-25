import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

import Button from '../components/Button';
import Input from '../components/Input';
import styles from "../styles/LandingPage.module.css";
import { INPUT_CONSTANTS, KEYBOARD_CONSTANTS } from '../constants';
import axiosServices from '../service/apiService';

const JOINING_URL = '/chat-room/join/';

const LandingPage = () => {

	const [room, setRoom] = useState("");
	const [name, setName] = useState("");

	const router = useRouter();

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.name === INPUT_CONSTANTS.NAME) {
			setName(e.target.value);
		}
		if (e.target.name === INPUT_CONSTANTS.ROOM) {
			setRoom(e.target.value);
		}
	}

	const keyPressHandler = (e: KeyboardEvent | any): void => {
		if (e.type)
			if (e?.key === KEYBOARD_CONSTANTS.ENTER && name && room) handleJoin();
	}

	const handleJoin = async () => {
		if (name && room) {

			const data = {
				name: room,
				connectedUser: name
			};

			try {
				const responseData = await axiosServices.post(JOINING_URL, data);
				const { userId, roomId, roomName } = responseData;
				const updatedLocation = `/room?userId=${userId}&roomId=${roomId}&roomName=${roomName}`;
				router.push(updatedLocation);
			}
			catch (error) {
				console.error(error);
			}
		}
	}

	return (
		<div className={styles.outerBox}>
			<div className={styles.innerTopBox}>
				<div className={styles.iconTextContainer}><div className={styles.smileIcon}>
					<FontAwesomeIcon icon={faSmile} color='white' fixedWidth />
				</div>
					<h1 className={styles.headText}> Chat App</h1>
				</div>
			</div>
			<div className={styles.innerBottomBox}>
				<span className={styles.text}>Username</span>
				<Input
					value={name}
					name={INPUT_CONSTANTS.NAME}
					onChange={inputChangeHandler}
					placeholder='Enter User Name'
					onKeyPress={keyPressHandler}
					largeWidth={false} />
				<span className={styles.text}>Room</span>
				<Input
					value={room}
					name={INPUT_CONSTANTS.ROOM}
					onChange={inputChangeHandler}
					placeholder='Enter Room Name'
					onKeyPress={keyPressHandler}
					largeWidth={false} />
				<Button largeWidth={true} label='Join Room' onClick={handleJoin} />
			</div>
		</div>
	)
}

export default LandingPage;