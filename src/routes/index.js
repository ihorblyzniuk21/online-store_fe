import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" exact element={<HomePage/>}/>
			<Route path="/login" element={<LoginPage/>}/>
			<Route path="/registration" element={<RegisterPage/>}/>
		</Routes>
	)
}

export default AppRoutes;