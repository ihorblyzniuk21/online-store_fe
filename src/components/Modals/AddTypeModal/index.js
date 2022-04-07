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
import { loginValidationSchema, typeBrandValidationSchema } from "../../../services/validations"
import { login } from "../../../store/auth/asyncThunks"
import { addType, getAllTypes } from "../../../store/shop/asyncThunks"

const AddTypeModal = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const types = useSelector(state => state.shop.types);
	const isShopLoading = useSelector(state => state.shop.isShopLoading);

	useEffect(() => {
		dispatch(getAllTypes());
	}, [])

	const formik = useFormik({
		initialValues: {
			name: ''
		},
		validationSchema: typeBrandValidationSchema,
		onSubmit: async (values, {resetForm}) => {
			try {
				await dispatch(addType(values));
				await dispatch(getAllTypes());
				resetForm({ values: '' })
			} catch (e) {
				console.log(e)
			}
		},
	});

	const handleClose = () => {
		navigate('/admin');
	};

	const onAddType = async () => {
		console.log()
	}

	return (
		<div>
			<Dialog open={true} onClose={handleClose}>
				<DialogTitle>Add new type</DialogTitle>
				<form style={{width: "400px"}} onSubmit={formik.handleSubmit}>
					{isShopLoading ? (
						<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
							<CircularProgress />
						</div>
					) : (
						<DialogContent>
							<div>Types:</div>
							{types?.length ? (
								<ul>
									{types.map((type) => {
										return <li key={type?.id}>{type?.name}</li>
									})}
								</ul>
							) : (
								<div>No types yet</div>
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

export default AddTypeModal;