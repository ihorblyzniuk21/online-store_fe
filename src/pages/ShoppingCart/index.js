import { useDispatch, useSelector } from "react-redux";
import {
	deleteBasketDevice, getBasket,
} from "../../store/shop/asyncThunks";
import { Button, Container, Grid, Table, TableBody, TableCell, TableRow } from "@mui/material";

const ShoppingCart = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	const basketDevices = useSelector(state => state.shop.basketDevices);

	const onDeleteButtonClick = async (id) => {
		await dispatch(deleteBasketDevice(id));
		await dispatch(getBasket(user.id));
	}

	return (
		<Container maxWidth="xl">
			<Table style={{marginTop: "100px"}} size="small" aria-label="a dense table">
				<TableBody>
					{basketDevices?.length ? basketDevices.map((item) => (
						<TableRow
							key={item?.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell align="center">
								<img style={{height: "150px"}} src={`${process.env.REACT_APP_API_URL}${item?.device?.img}`}/>
							</TableCell>
							<TableCell align="center">
								<div style={{fontSize: "30px"}}>{item?.device?.name}</div>
							</TableCell>
							<TableCell align="center">
								<div style={{fontSize: "20px"}}>{item?.device?.price}$</div>
							</TableCell>
							<TableCell align="right">
								<Button onClick={() => onDeleteButtonClick(item?.id)} variant="outlined">X</Button>
							</TableCell>
						</TableRow>
					)) : null}
				</TableBody>
			</Table>
		</Container>
	)
}

export default ShoppingCart