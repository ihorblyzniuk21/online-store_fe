import { Button, Container, Typography } from "@mui/material"
import { Link, Outlet } from "react-router-dom"

const AdminDashboard = () => {

	return (
		<Container>
			<Typography variant="h4" style={{marginTop: "30px", textAlign: "center"}}>Admin Dashboard</Typography>
			<div style={{width: "400px", margin: "100px auto", padding: "30px", border: "2px solid #1e1e1e", borderRadius: "7px", display: "flex", justifyContent: "space-between"}}>
				<Link style={{textDecoration: "none"}} to="/admin/type">
					<Button variant="contained">Add type</Button>
				</Link>
				<Link style={{textDecoration: "none"}} to="/admin/brand">
					<Button variant="contained">Add brand</Button>
				</Link>
				<Link style={{textDecoration: "none"}} to="/admin/device">
					<Button variant="contained">Add device</Button>
				</Link>
			</div>
			<Outlet/>
		</Container>
	)
}

export default AdminDashboard;