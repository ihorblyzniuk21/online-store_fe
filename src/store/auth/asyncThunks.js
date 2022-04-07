import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import axios from "axios";

export const register = createAsyncThunk(
	"auth/register",
	async (body,{rejectWithValue}) => {
		try {
			const { data } = await api.registration(body);
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
)

export const login = createAsyncThunk(
	"auth/login",
	async (body,{rejectWithValue}) => {
		try {
			const { data } = await api.login(body);
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
)

export const logout = createAsyncThunk(
	"auth/logout",
	async (data,{rejectWithValue}) => {
		try {
			const { data } = await api.logout();
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
)

export const activateAccount = createAsyncThunk(
	"auth/activateAccount",
	async (link, {rejectWithValue}) => {
		try {
			const response = await api.activateAccount(link);
			return response;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
)

export const getUsers = createAsyncThunk(
	"auth/getUsers",
	async (data, {rejectWithValue}) => {
		try {
			const { data } = await api.getUsers();
			return data;
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)
// export const refresh = createAsyncThunk(
// 	"auth/refresh",
// 	async (data,{rejectWithValue}) => {
// 		try {
// 			const response = await api.refresh();
// 			return response;
// 		} catch (e) {
// 			return rejectWithValue(e);
// 		}
// 	}
// )

export const checkAuth = createAsyncThunk(
	"auth/checkAuth",
	async (data, {rejectWithValue}) => {
		try {
			const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/auth/refresh`, {withCredentials: true});
			return data;
		} catch (e) {
			return rejectWithValue(e)
		}

	}
)