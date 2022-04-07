import {
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import { typeBrandValidationSchema } from "../../../services/validations"
import { addBrand, addType, getAllBrands, getAllTypes } from "../../../store/shop/asyncThunks"

const AddBrandModal = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const brands = useSelector(state => state.shop.brands);
	const isShopLoading = useSelector(state => state.shop.isShopLoading);

	useEffect(() => {
		dispatch(getAllBrands());
	}, [])

	const formik = useFormik({
		initialValues: {
			name: ''
		},
		validationSchema: typeBrandValidationSchema,
		onSubmit: async (values, {resetForm}) => {
			try {
				await dispatch(addBrand(values));
				await dispatch(getAllBrands());
				resetForm({ values: '' })
			} catch (e) {
				console.log(e)
			}
		},
	});

	const handleClose = () => {
		navigate('/admin');
	};

	return (
		<div>
			<Dialog open={true} onClose={handleClose}>
				<DialogTitle>Add new brand</DialogTitle>
				<form style={{width: "400px"}} onSubmit={formik.handleSubmit}>
					{isShopLoading ? (
						<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
							<CircularProgress />
						</div>
					) : (
						<DialogContent>
							<div>Brands:</div>
							{brands?.length ? (
								<ul>
									{brands.map((brand) => {
										return <li key={brand?.id}>{brand?.name}</li>
									})}
								</ul>
							) : (
								<div>No brands yet</div>
							)}

							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Type Name"
								type="text"
								fullWidth
								variant="standard"
								value={formik.values.name}
								onChange={formik.handleChange}
								error={formik.touched.name && Boolean(formik.errors.name)}
								helperText={formik.touched.name && formik.errors.name}
							/>
						</DialogContent>
					)}

					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type="submit">Add</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	)
}

export default AddBrandModal;