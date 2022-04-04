import { Link } from "react-router-dom"

const LoginPage = () => {
	return (
		<>
			<div>
				Login
			</div>
			<Link to="/">Home</Link>
			<Link to="/registration">Registration</Link>
		</>
	)
}

export default LoginPage;