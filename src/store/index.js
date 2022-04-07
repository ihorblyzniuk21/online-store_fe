import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/slice";
import shop from "./shop/slice";

export default configureStore({
	reducer: {
		auth,
		shop
	}
})