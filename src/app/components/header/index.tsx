import {
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	Stack,
	Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { Basket } from './basket';
import { verifiedMemberData } from '../../apiServices/verify';

export function NavbarHome(props: any) {
	return (
		<Box className='navbar-root'>
			<Container maxWidth='lg'>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					className='navbar-top'
				>
					<Typography variant='h5' fontWeight={700}>
						Online Restaurant
					</Typography>
					<Stack
						direction='row'
						spacing={3}
						alignItems='center'
						className='navbar-links'
					>
						<NavLink to='/' className='nav-item' onClick={props.setPath}>
							Explore
						</NavLink>
						<NavLink
							to='/restaurant'
							className='nav-item'
							onClick={props.setPath}
						>
							Restaurants
						</NavLink>
						{verifiedMemberData && (
							<NavLink
								to='/orders'
								className='nav-item'
								onClick={props.setPath}
							>
								Orders
							</NavLink>
						)}
						<NavLink
							to='/community'
							className='nav-item'
							onClick={props.setPath}
						>
							Social
						</NavLink>
						{verifiedMemberData && (
							<NavLink
								to='/member-page'
								className='nav-item'
								onClick={props.setPath}
							>
								My Page
							</NavLink>
						)}
						<NavLink to='/help' className='nav-item' onClick={props.setPath}>
							Help
						</NavLink>

						<Basket
							cartItems={props.cartItems}
							onAdd={props.onAdd}
							onRemove={props.onRemove}
							onDelete={props.onDelete}
							onDeleteAll={props.onDeleteAll}
							setOrderRebuild={props.setOrderRebuild}
						/>

						{!verifiedMemberData ? (
							<Button variant='contained' onClick={props.handleLoginOpen}>
								Login
							</Button>
						) : (
							<IconButton onClick={props.handleLogOutClick}>
								<Avatar src={verifiedMemberData.mb_image} alt='user' />
							</IconButton>
						)}
						<Menu
							anchorEl={props.anchorEl}
							open={props.open}
							onClose={props.handleCloseLogOut}
							onClick={props.handleCloseLogOut}
						>
							<MenuItem onClick={props.handleLogOutRequest}>
								<ListItemIcon>
									<Logout fontSize='small' />
								</ListItemIcon>
								Logout
							</MenuItem>
						</Menu>
					</Stack>
				</Stack>

				{/* Head section */}
				<Stack
					className='navbar-hero'
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Box>
						<Typography variant='h3' fontWeight={600}>
							Restaurants & Cafes
						</Typography>
						{!verifiedMemberData && (
							<Button
								variant='contained'
								color='primary'
								sx={{ mt: 3 }}
								onClick={props.handleSignupOpen}
							>
								Sign Up
							</Button>
						)}
					</Box>
				</Stack>
			</Container>
		</Box>
	);
}
