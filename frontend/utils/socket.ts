import openSocket from 'socket.io-client';

const baseURL = 'http://localhost:3000';

const socketInstance = (() => {
	let instance: any;

	const createInstance = () => {
		const socket = openSocket(baseURL);
		return socket;
	}

	return {
		getInstance: () => {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	};
})();

export default socketInstance;
