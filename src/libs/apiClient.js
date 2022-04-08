import axios from "axios";

const apiClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"Accept": "application/json"
	},
	withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config;
})

apiClient.interceptors.response.use((config) => {
	return config
},  (async (error) => {
	const originalRequest = error.config;
	if (error.response.status == 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/auth/refresh`, {withCredentials: true});
			localStorage.setItem('token', data.accessToken);
			return apiClient.request(originalRequest);
		} catch (e) {
			console.log('No authorized');
		}
	}
	throw error;
}))

export default apiClient;