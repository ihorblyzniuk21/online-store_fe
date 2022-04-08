import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getAllBrands = createAsyncThunk(
	"shop/getAllBrands",
	async (body, {rejectWithValue}) => {
		try {
			const { data } = await api.getAllBrands();
			return data;
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const addBrand = createAsyncThunk(
	"shop/addBrand",
	async (body, {rejectWithValue}) => {
		try {
			const { data } = await api.addBrand(body);
			return data;
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const getAllTypes = createAsyncThunk(
	"shop/getAllTypes",
	async (body, {rejectWithValue}) => {
		try {
			const { data } = await api.getAllTypes();
			return data;
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const addType = createAsyncThunk(
	"shop/addType",
	async (body, {rejectWithValue}) => {
		try {
			const { data } = await api.addType(body);
			return data;
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const getAllDevices = createAsyncThunk(
	"shop/getAllDevices",
	async (body, {rejectWithValue}) => {
		try {
			const { data } = await api.getAllDevices(body);
			return data;
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const getOneDevice = createAsyncThunk(
	"shop/getOneDevice",
	async (id, {rejectWithValue}) => {
		try {
			const { data } = await api.getOneDevice(id);
			return data;
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const addDevice = createAsyncThunk(
	"shop/addDevice",
	async ({name, price, typeId, brandId, img, info}, {rejectWithValue}) => {
		try {
			const data = new FormData()
			data.append("name", name);
			data.append("price", price);
			data.append("typeId", typeId);
			data.append("brandId", brandId);
			data.append("img", img);
			data.append("info", JSON.stringify(info));
			const response = await api.addDevice(data);
			return response;
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const getBasket = createAsyncThunk(
	"shop/getBasket",
	async (body, {rejectWithValue}) => {
		try {
			console.log("HELLO", body);
			const { data } = await api.getBasket(body)
			return data;
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const addBasketDevice = createAsyncThunk(
	"shop/addBasketDevice",
	async (body, {rejectWithValue}) => {
		try {
			const { data } = await api.addBasketDevice(body);
			return data;
		} catch (e) {
			return rejectWithValue(e)
		}

	}
)

export const getAllBasketDevices = createAsyncThunk(
	"shop/getAllBasketDevices",
	async (body, {rejectWithValue}) => {
		try {
			const { data } = await api.getAllBasketDevices(body);
			return data
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const deleteBasketDevice = createAsyncThunk(
	"shop/deleteBasketDevice",
	async (id , {rejectWithValue}) => {
		try {
			const { data } = await api.deleteBasketDevice(id);
			return data;
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)