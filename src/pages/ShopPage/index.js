import { Link } from "react-router-dom"
import {
	Container,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
	Box,
	Card,
	CardActionArea, CardMedia, CardContent, CardActions,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../store/auth/asyncThunks"
import { useEffect, useState } from "react"
import { getAllBrands, getAllDevices, getAllTypes } from "../../store/shop/asyncThunks"
import ShopFilters from "../../components/ShopFilters"
import Button from "@mui/material/Button"
import DeviceItem from "../../components/DeviceItem"

const ShopPage = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(state => state.auth.isAuth);
	const devices = useSelector(state => state.shop.devices);
	const [selectedType, setSelectedType] = useState(null);
	const [selectedBrand, setSelectedBrand] = useState(null);

	useEffect(() => {
		dispatch(getAllBrands());
		dispatch(getAllTypes());
	}, [])

	useEffect(() => {
		const body = {
			typeId: selectedType,
			brandId: selectedBrand
		}
		dispatch(getAllDevices(body));
	}, [selectedType, selectedBrand])

	return (
		<Container maxWidth="xl">
			<Grid container style={{marginTop: "40px"}}>
				<Grid item xs={2}>
					<ShopFilters
						selectedType={selectedType}
						setSelectedType={setSelectedType}
						selectedBrand={selectedBrand}
						setSelectedBrand={setSelectedBrand}
					/>
				</Grid>
				<Grid item xs={10}>
					<Box style={{width: "100%", height: "100vh", display: "grid", gridTemplateColumns: "repeat(auto-fill, 345px)", gridTemplateRows: "repeat(auto-fill, 345px)", gap: "30px"}}>
						{devices.map((device) => {
							return (
								<DeviceItem
									key={device.id}
									device={device}
								/>
							)
						})}
					</Box>
				</Grid>
			</Grid>
		</Container>
	)
}

export default ShopPage;