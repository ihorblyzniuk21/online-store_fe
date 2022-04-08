import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addBasketDevice, getBasket, getOneDevice } from "../../store/shop/asyncThunks"
import {
	Button,
	Container,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material"

const DevicePage = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const device = useSelector(state => state.shop.currentDevice);
	const user = useSelector(state => state.auth.user);

	useEffect(() => {
		dispatch(getOneDevice(id));
	}, [])

	const onClickAddToCart = async () => {
		const data = {
			basketId: user?.basket?.id,
			deviceId: device.id
		}
		await dispatch(addBasketDevice(data))
		await dispatch(getBasket(user.id))
	}

	return (
		<Container maxWidth="xl">
			<Grid style={{marginTop: "50px"}} container>
				<Grid item xs={6}>
					<img style={{height: "700px"}} src={`${process.env.REACT_APP_API_URL}${device?.img}`}/>
					<div style={{marginTop: "40px"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aliquid aperiam consectetur eligendi exercitationem, illo ipsam laborum minima, qui quibusdam sapiente vel voluptatum! Cumque exercitationem maxime minima optio ratione totam?</div>
				</Grid>
				<Grid style={{padding: "60px 100px"}} item xs={6}>
					<Typography variant="h4">{device?.name}</Typography>
					<div style={{display: "flex", alignItems: "center", marginTop: "20px"}}>
						<Typography style={{marginRight: "40px"}} variant="h5">{device?.price}$</Typography>
						<Button onClick={onClickAddToCart}>Add to cart</Button>
					</div>
					<Typography style={{marginTop: "20px"}} variant="h6">Characteristics:</Typography>
					<TableContainer style={{marginTop: "10px"}} component={Paper}>
						<Table size="small" aria-label="a dense table">
							<TableBody>
								{device?.info?.length ? device.info.map((item) => (
									<TableRow
										key={item.id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell align="center">{item.title}</TableCell>
										<TableCell align="center">{item.description}</TableCell>
									</TableRow>
								)) : null}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Container>
	)
}

export default DevicePage