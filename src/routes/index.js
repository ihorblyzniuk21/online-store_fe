import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/ShopPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import AdminDashboard from "../pages/AdminDashboard"
import AddTypeModal from "../components/Modals/AddTypeModal"
import AddBrandModal from "../components/Modals/AddBrandModal"
import AddDeviceModal from "../components/Modals/AddDeviceModal"
import DevicePage from "../pages/DevicePage"
import ShoppingCart from "../pages/ShoppingCart"
import { useEffect } from "react"
import { getBasket } from "../store/shop/asyncThunks"
import { useDispatch } from "react-redux"

const AppRoutes = ({user}) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getBasket(user?.basket.id))
	}, [user])

	return (
		<Routes>
			<Route path="/" exact element={<HomePage/>}/>
			<Route path="/device/:id" element={<DevicePage/>}/>
			<Route path="/login" element={<LoginPage/>}/>
			<Route path="/registration" element={<RegisterPage/>}/>
			<Route path="/cart" element={<ShoppingCart/>}/>
			{
				user?.role === "ADMIN" &&
				<Route path="/admin" element={<AdminDashboard/>}>
					<Route path="/admin/type" element={<AddTypeModal/>}/>
					<Route path="/admin/brand" element={<AddBrandModal/>}/>
					<Route path="/admin/device" element={<AddDeviceModal/>}/>
				</Route>
			}
		</Routes>
	)
}

export default AppRoutes;