import {
	AppBar,
	Box,
	Toolbar,
	Switch,
	Typography,
	Button,
} from '@mui/material';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
import { ThemeContext } from '../../context/ThemeContext';
import { icon, logo } from '../../icons/check';
import Divider from '@mui/material/Divider';

const LogoContainer = styled.div`
	width: 300px;
	height: auto;
`;
const Logo = styled.img`
	width: 100%;
`;

const StyledHome = styled.button`
	background-image: url(${logo});
	width: 300px;
	heigh: auto;
	border: none;
	background: transparent;
`;

const Nav = () => {
	const { isLoggedIn, user, homeRoute, pathRoutes } = useContext(LoginContext);
	const { toggleTheme } = useContext(ThemeContext);
	return (
		<AppBar
			position='static'
			sx={{
				width: '100%',
				boxShadow: 'none',
				backgroundImage: 'none',
				background: 'none',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'baseline',
					margin: '20px',
				}}
			>
				{isLoggedIn && (
					<Typography
						component='div'
						sx={{ display: 'flex', justifyContent: 'flex-end' }}
					>
						<Box
							component='img'
							src={icon}
							alt='user'
							sx={{ height: '20px', marginRight: '10px' }}
						/>
						{user}
					</Typography>
				)}
				<Switch onClick={toggleTheme} />
			</Box>

			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: { md: 'row', xs: 'column' },
				}}
			>
				<LogoContainer>
					<NavLink to={homeRoute.path}>
						<StyledHome>
							<Logo src={logo} alt='logo' />
						</StyledHome>
					</NavLink>
				</LogoContainer>
				<Box
					sx={{
						width: { xs: '100%', md: '70%' },
						display: 'flex',
						justifyContent: 'space-evenly',
						gap: '20px',
						flexWrap: 'wrap',
					}}
				>
					{pathRoutes.map((el) => (
						<NavLink key={el.id} to={el.path}>
							<Button>{el.name}</Button>
						</NavLink>
					))}
				</Box>
			</Toolbar>
			<Divider sx={{ margin: '20px 0' }} />
		</AppBar>
	);
};
export default Nav;
