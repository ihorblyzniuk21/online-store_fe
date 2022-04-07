import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllBasketDevices } from "../../store/shop/asyncThunks"

const ShoppingCart = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);

	console.log("user", user)
	useEffect(() => {
		dispatch(getAllBasketDevices(user?.basket.id));
	}, [])

	return (
		<div>
			Hello
		</div>
	)
}

export default ShoppingCart