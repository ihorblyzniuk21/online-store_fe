import { useFormik } from 'formik';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom"
import { registerValidationSchema } from "../../services/validations"
import { useDispatch } from "react-redux"
import { register } from "../../store/auth/asyncThunks"

const theme = createTheme();

const RegisterForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			name: ''
		},
		validationSchema: registerValidationSchema,
		onSubmit: async (values) => {
			try {
				await dispatch(register(values));
				navigate("/")
			} catch (e) {
				console.log(e)
			}

		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete="given-name"
									name="name"
									required
									fullWidth
									id="name"
									label="Name"
									autoFocus
									value={formik.values.name}
									onChange={formik.handleChange}
									error={formik.touched.name && Boolean(formik.errors.name)}
									helperText={formik.touched.name && formik.errors.name}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									value={formik.values.password}
									onChange={formik.handleChange}
									error={formik.touched.password && Boolean(formik.errors.password)}
									helperText={formik.touched.password && formik.errors.password}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link to="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default RegisterForm;