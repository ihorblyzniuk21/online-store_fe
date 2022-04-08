import { createSlice } from "@reduxjs/toolkit";
import {
	createBasketDevicesArray,
	getAllBasketDevices,
	getAllBrands,
	getAllDevices,
	getAllTypes,
	getBasket,
	getOneDevice,
} from "./asyncThunks"

const slice = createSlice({
	name: "shop",
	initialState: {
		devices: [],
		currentDevice: {},
		devicesCount: null,
		types: [],
		brands: [],
		basket: {},
		basketDevicesId: [],
		basketDevices: [],
		isShopLoading: false,
		errorMessage: null
	},
	reducers: {
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
			const {basket_devices, ...basket} = action.payload
			state.basket = basket;
			state.basketDevices = basket_devices;

		},
		[getOneDevice.fulfilled]: (state, action) => {
			state.currentDevice = action.payload;
		}
	}
})

export default slice.reducer;