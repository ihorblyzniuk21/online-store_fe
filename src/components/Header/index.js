import { useState } from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/auth/asyncThunks"


const Header = () => {
	const dispatch = useDispatch();
	const [anchorElNav, setAnchorElNav] = useState();
	const [anchorElUser, setAnchorElUser] = useState();
	const isAuth = useSelector(state => state.auth.isAuth);
	const user = useSelector(state => state.auth.user);
	const basketDevices = useSelector(state => state.shop.basketDevices)

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const StyledBadge = styled(Badge)(({ theme }) => ({
		'& .MuiBadge-badge': {
			right: -3,
			top: 13,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: '0 4px',
		},
	}));

	return (
		<AppBar position="static">
			<Container maxWidth="xxl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
					>
						LOGO
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link style={{textDecoration: "none", color: "#fff"}} to="/">Home</Link>
							</MenuItem>
							{isAuth ? (
								<MenuItem onClick={() => dispatch(logout())}>
									Logout
								</MenuItem>
							) : (
								<>
									<MenuItem onClick={handleCloseNavMenu}>
										<Link style={{textDecoration: "none", color: "#000"}} to="/login">Login</Link>
									</MenuItem>
									<MenuItem onClick={handleCloseNavMenu}>
										<Link style={{textDecoration: "none", color: "#000"}} to="/registration">Registration</Link>
									</MenuItem>
								</>
							)}

						</Menu>
					</Box>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<MenuItem onClick={handleCloseNavMenu}>
							<Link style={{textDecoration: "none", color: "#fff"}} to="/">Shop</Link>
						</MenuItem>
						{isAuth ? (
							<MenuItem onClick={() => dispatch(logout())}>
								Logout
							</MenuItem>
						) : (
							<>
								<MenuItem onClick={handleCloseNavMenu}>
									<Link style={{textDecoration: "none", color: "#fff"}} to="/login">Login</Link>
								</MenuItem>
								<MenuItem onClick={handleCloseNavMenu}>
									<Link style={{textDecoration: "none", color: "#fff"}} to="/registration">Registration</Link>
								</MenuItem>
							</>
						)}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Link to='/cart'>
							<IconButton style={{marginRight: "20px"}} aria-label="cart">
								<StyledBadge badgeContent={basketDevices?.length} color="secondary">
									<ShoppingCartIcon />
								</StyledBadge>
							</IconButton>
						</Link>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{ user?.role === "ADMIN" &&
								<MenuItem onClick={handleCloseUserMenu}>
									<Link style={{textDecoration: "none", color: "#000"}} to="/admin">
										<Typography textAlign="center">Admin dashboard</Typography>
									</Link>
								</MenuItem>
							}
							<MenuItem onClick={handleCloseUserMenu}>
								<Link style={{textDecoration: "none", color: "#000"}} to="/account">
									<Typography textAlign="center">Account</Typography>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography onClick={() => dispatch(logout())} textAlign="center">Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;
