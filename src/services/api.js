import apiClient from "../libs/apiClient";

export const api = {

	registration: async (body) => {
		const response = await apiClient.post('api/auth/registration', body);
		return response;
	},
	login: async (body) => {
		const response = await apiClient.post('api/auth/login', body);
		return response;
	},
	logout: async () => {
		const response = await apiClient.post('api/auth/logout');
		return response;
	},
	activateAccount: async (link) => {
		const response = await apiClient.get(`api/auth/activate/${link}`);
		return response;
	},
	refresh: async () => {
		const response = await apiClient.get(`api/auth/refresh`);
		return response;
	},
	getUsers: async () => {
		const response = await apiClient.get('api/auth/users');
		return response;
	},



	getAllBrands: async () => {
		const response = await apiClient.get('api/brand');
		return response;
	},
	addBrand: async (body) => {
		const response = await apiClient.post('api/brand', body);
		return response;
	},
	getAllTypes: async () => {
		const response = await apiClient.get('api/type');
		return response;
	},
	addType: async (body) => {
		const response = await apiClient.post('api/type', body);
		return response;
	},
	getAllDevices: async ({typeId, brandId}) => {
		if(typeId && !brandId) {
			const response = await apiClient.get(`api/device?typeId=${typeId}`);
			return response;
		}
		if(brandId && !typeId) {
			const response = await apiClient.get(`api/device?brandId=${brandId}`);
			return response;
		}
		if(typeId && brandId) {
			const response = await apiClient.get(`api/device?typeId=${typeId}&brandId=${brandId}`);
			return response;
		}
		const response = await apiClient.get('api/device');
		return response;
	},
	getOneDevice: async (id) => {
		const response = await apiClient.get(`api/device/${id}`);
		return response;
	},
	addDevice: async (body) => {
		const response = await apiClient.post('api/device', body);
		return response;
	},
	getBasket: async (id) => {
		const response = await apiClient.get(`api/basket?id=${id}`);
		return response;
	},
	addBasketDevice: async (body) => {
		const response = await apiClient.post('api/basket/basket-device', body);
		return response;
	},
	getAllBasketDevices: async (body) => {
		const response = await apiClient.get('api/basket/basket-device', body);
		return response;
	},
	deleteBasketDevice: async (id) => {
		const response = await apiClient.delete(`api/basket/basket-device?id=${id}`);
		return response;
	}
}