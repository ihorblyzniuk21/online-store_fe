import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const DeviceItem = ({device}) => {
	return (
		<Link style={{textDecoration: "none"}} to={`/device/${device.id}`}>
			<Card sx={{ maxWidth: 345, maxHeight: 345 }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="250"
						image={`${process.env.REACT_APP_API_URL}${device.img}`}
						alt={device.name}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{device.name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{device.price}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>

	)
}

export default DeviceItem;