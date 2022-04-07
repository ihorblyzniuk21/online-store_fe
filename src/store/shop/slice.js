import { createSlice } from "@reduxjs/toolkit";
import { getAllBasketDevices, getAllBrands, getAllDevices, getAllTypes, getBasket, getOneDevice } from "./asyncThunks"

const slice = createSlice({
	name: "shop",
	initialState: {
		devices: [],
		currentDevice: {},
		devicesCount: null,
		types: [],
		brands: [],
		basket: {},
		basketDevices: [],
		isShopLoading: false,
		errorMessage: null,
		infoCount: 0
	},
	reducers: {
		addInfoCount(state, action) {
			state.infoCount = state.infoCount + 1;
		},
		removeInfoCount(state, action) {
			state.infoCount = state.infoCount + 1;
		}
	},
	extraReducers: {
		[getAllBrands.fulfilled]: (state, action) => {
			state.brands = action.payload;
			state.errorMessage = null;
			state.isShopLoading = false;
		},
		[getAllBrands.pending]: (state) => {
			state.isShopLoading = true;
		},
		[getAllBrands.rejected]: (state, action) => {
			state.errorMessage = action?.payload?.response?.data?.message;
			state.isShopLoading = false;
		},
		[getAllTypes.fulfilled]: (state, action) => {
			state.types = action.payload;
			state.errorMessage = null;
			state.isShopLoading = false;
		},
		[getAllTypes.pending]: (state) => {
			state.isShopLoading = true;
		},
		[getAllTypes.rejected]: (state, action) => {
			state.errorMessage = action?.payload?.response?.data?.message;
			state.isShopLoading = false;
		},
		[getAllDevices.fulfilled]: (state, action) => {
			state.errorMessage = null;
			state.devices = action.payload?.rows;
			state.devicesCount = action.payload?.count;
			state.isShopLoading = false;
		},
		[getAllDevices.pending]: (state) => {
			state.isShopLoading = true;
		},
		[getAllDevices.rejected]: (state, action) => {
			state.errorMessage = action?.payload?.response?.data?.message;
			state.isShopLoading = false;
		},
		[getBasket.fulfilled]: (state, action) => {
			state.basket = action.payload;
		},
		[getOneDevice.fulfilled]: (state, action) => {
			state.currentDevice = action.payload;
		},
		[getAllBasketDevices.fulfilled]: (state, action) => {
			state.basketDevices = action.payload;
		}
	}
})

export const { addInfoCount, removeInfoCount } = slice.actions;
export default slice.reducer;