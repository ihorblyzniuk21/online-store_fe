import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle, IconButton, MenuItem, Select,
	TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { deviceValidationSchema } from "../../../services/validations";
import { addDevice, getAllBrands, getAllTypes } from "../../../store/shop/asyncThunks";
import { addInfoCount } from "../../../store/shop/slice"
import { DeleteOutline } from "@mui/icons-material"

const AddDeviceModal = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const types = useSelector(state => state.shop.types);
	const brands = useSelector(state => state.shop.brands);
	const [img, setImg] = useState("");

	const [info, setInfo] = useState([]);

	useEffect(() => {
		(async () => {
			await dispatch(getAllTypes());
			await dispatch(getAllBrands());
		})()
	}, [])

	const formik = useFormik({
		initialValues: {
			name: '',
			typeId: "default",
			brandId: "default",
			price: ""
		},
		validationSchema: deviceValidationSchema,
		onSubmit: async (values, {resetForm}) => {
			try {
				const body = {
					img,
					info,
					...values
				}
				await dispatch(addDevice(body));
				setImg('')
				resetForm({ values: '' })
				setInfo([]);
			} catch (e) {
				console.log(e)
			}
		},
	});

	const handleClose = () => {
		navigate('/admin');
	};

	const addInfo = () => {
		setInfo([...info, {title: '', description: '', number: Date.now()}])
	}
	const removeInfo = (number) => {
		setInfo(info.filter(i => i.number !== number))
	}
	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
	}


	return (
		<div>
			<Dialog open={true} maxWidth="md" fullWidth onClose={handleClose}>
				<DialogTitle>Add new device</DialogTitle>
				<form style={{width: "650px", display: "block", margin: "0 auto"}} onSubmit={formik.handleSubmit}>
					<DialogContent>
						<TextField
							autoFocus
							margin="normal"
							id="name"
							label="Device name"
							fullWidth
							type="text"
							variant="outlined"
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
						/>
						<TextField
							autoFocus
							margin="dense"
							id="price"
							label="Price"
							type="number"
							fullWidth
							variant="outlined"
							value={formik.values.price}
							onChange={formik.handleChange}
							error={formik.touched.price && Boolean(formik.errors.price)}
							helperText={formik.touched.price && formik.errors.price}
						/>
						<div style={{marginTop: "20px"}}>
							<Select
								style={{width: "210px", marginRight: "20px"}}
								id="typeId"
								value={formik.values.typeId}
								onChange={formik.handleChange('typeId')}
								error={formik.touched.typeId && Boolean(formik.errors.typeId)}
								helperText={formik.touched.typeId && formik.errors.typeId}
							>
								<MenuItem value="default">Select type</MenuItem>
								{types.map((type) => {
									return (
										<MenuItem key={type?.id} value={type?.id}>{type.name}</MenuItem>
									)
								})}
							</Select>
							<Select
								style={{width: "210px"}}
								id="typeId"
								value={formik.values.brandId}
								onChange={formik.handleChange('brandId')}
								error={formik.touched.brandId && Boolean(formik.errors.brandId)}
								helperText={formik.touched.brandId && formik.errors.brandId}
							>
								<MenuItem value="default">Select brand</MenuItem>
								{brands.map((brand) => {
									return (
										<MenuItem key={brand?.id} value={brand?.id}>{brand.name}</MenuItem>
									)
								})}
							</Select>
						</div>

						<input
							style={{margin: "20px 0"}}
							required
							id="img"
							type="file"
							onChange={(e) => setImg(e.target.files[0])}
						/>
						{info.length ? (
							info.map((i) => {
								return (
									<div key={i.number} style={{display: "flex", alignItems: "flex-end"}}>
										<TextField
											style={{marginRight: "15px"}}
											margin="dense"
											id="title"
											label="Add device info title"
											type="text"
											fullWidth
											variant="standard"
											value={i.title}
											onChange={(e) => changeInfo('title', e.target.value, i.number)}
										/>
										<TextField
											style={{marginRight: "15px"}}
											margin="dense"
											id="price"
											fullWidth
											label="Add device info description"
											type="text"
											variant="standard"
											value={i.description}
											onChange={(e) => changeInfo('description', e.target.value, i.number)}
										/>
										<IconButton onClick={() => removeInfo(i.number)} aria-label="delete">
											<DeleteOutline />
										</IconButton>
									</div>
								)
							})
						) : null}
						<Button onClick={addInfo} style={{display: "block", marginTop: "20px"}} variant="outlined">Add device info</Button>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type="submit">Add</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	)
}

export default AddDeviceModal;