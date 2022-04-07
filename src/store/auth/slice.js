import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, getUsers, login, logout, register } from "./asyncThunks"

const slice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		basketId: null,
		basketDevices: [],
		isAuth: false,
		loading: false,
		errorMessage: null,
		users: null
	},
	reducers: {

	},
	extraReducers: {
		[register.fulfilled]: (state, action) => {
			localStorage.setItem('token', action.payload?.accessToken);
			state.loading = false;
			state.isAuth = true;
			state.user = action.payload?.user;
			state.errorMessage = null;
		},
		[register.pending]: (state) => {
			state.loading = true;
		},
		[register.rejected]: (state, action) => {
			state.errorMessage = action?.payload?.response?.data?.message
		},
		[login.fulfilled]: (state, action) => {
			localStorage.setItem('token', action.payload?.accessToken);
			state.loading = false;
			state.isAuth = true;
			state.user = action.payload?.user;
			state.errorMessage = null;
		},
		[login.pending]: (state) => {
			state.loading = true;
		},
		[login.rejected]: (state, action) => {
			state.errorMessage = action?.payload?.response?.data?.message
		},
		[logout.fulfilled]: (state) => {
			localStorage.removeItem('token');
			state.loading = false;
			state.isAuth = false;
			state.user = null;
			state.errorMessage = null;
		},
		[logout.rejected]: (state, action) => {
			state.errorMessage = action?.payload?.response?.data?.message
		},
		[checkAuth.fulfilled]: (state, action) => {
			localStorage.setItem('token', action.payload?.accessToken);
			state.loading = false;
			state.isAuth = true;
			state.user = action.payload.user;
			state.errorMessage = null;
		},
		[checkAuth.rejected]: (state, action) => {
			localStorage.removeItem('token');
			state.loading = false;
			state.isAuth = false;
			state.user = null;
			state.errorMessage = null;
		},
		[getUsers.fulfilled]: (state, action) => {
			console.log(action.payload);
		}
	}
})

export default slice.reducer;