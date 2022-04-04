import { Link } from "react-router-dom"

const RegisterPage = () => {
	return (
		<>
			<div>
				Register
			</div>
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
		</>
	)
}

export default RegisterPage;