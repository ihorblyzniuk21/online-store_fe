import { apiClient } from "../libs/apiClient";

export const api = {
	registration: async (body) => {
		const response = await apiClient.post('/auth/registration', body);
		return response;
	},
	login: async (body) => {
		const response = await apiClient.post('/auth/login', body);
		return response;
	},
	logout: async () => {
		const response = await apiClient.post('/auth/logout');
		return response;
	},
	activateAccount: async () => {
		const response = await apiClient.post();
	}
}