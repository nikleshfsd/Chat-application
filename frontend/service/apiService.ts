import axios, { AxiosRequestConfig } from 'axios';

const baseURL = 'http://localhost:3000';

axios.defaults.baseURL = baseURL;

const API_CONFIG: AxiosRequestConfig = {
	headers: {
		"Content-Type": "application/json",
	},
};

const post = async (url: string = '', data: Object = {}, config: Object = {}) => {
	const body = JSON.stringify(data);
	let response;
	try {
		response = await axios({
			...API_CONFIG,
			method: 'POST',
			url,
			data: body,
			...config
		});
		if (response?.status! >= 400) {
			console.error('Error in getting response');
			return;
		} else {
			return response?.data;
		}
	} catch (error) {
		console.error('Error in fetching API: ', error);
	}
}

export default {
	post
};

