import { List, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useSelector } from "react-redux"

const ShopFilters = ({selectedBrand, selectedType, setSelectedBrand, setSelectedType}) => {

	const types = useSelector(state => state.shop.types);
	const brands = useSelector(state => state.shop.brands);

	const handleType = (id) => {
		setSelectedType(id);
	}
	const handleBrand = (id) => {
		setSelectedBrand(id);
	}

	return (
		<div>
			<div>
				<Typography variant="h5">Type:</Typography>
				<List>
					<ListItemButton>
						<ListItemText
							primary="All"
							onClick={() => setSelectedType(null)}
						/>
					</ListItemButton>
					{types.map((type) => {
						return(
							<ListItemButton
								key={type.id}
								selected={type.id === selectedType}
							>
								<ListItemText
									primary={type.name}
									onClick={() => handleType(type.id)}
								/>
							</ListItemButton>
						)
					})}
				</List>
			</div>
			<div>
				<Typography variant="h5">Brand:</Typography>
				<List>
					<ListItemButton>
						<ListItemText
							primary="All"
							onClick={() => setSelectedBrand(null)}
						/>
					</ListItemButton>
					{brands.map((brand) => {
						return(
							<ListItemButton
								key={brand.id}
								selected={brand.id === selectedBrand}
							>
								<ListItemText
									primary={brand.name}
									onClick={() => handleBrand(brand.id)}
								/>
							</ListItemButton>
						)
					})}
				</List>
			</div>
		</div>
	)
}

export default ShopFilters;