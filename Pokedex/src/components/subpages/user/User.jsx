import Register from './Register';
import Login from './Login';
import { useState } from 'react';
import { Box, Button, Paper } from '@mui/material';

const User = () => {
	const [action, setAction] = useState(true);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
				alignItems: 'center',
			}}
		>
			<Button
				sx={{ width: '10%', minWidth: '280px' }}
				onClick={() => setAction((prev) => !prev)}
			>
				{action ? 'Zarejestruj Się' : 'Zaloguj się'}
			</Button>
			<Paper sx={{ width: '60%', height: '600px', minWidth: '300px' }}>
				{action ? <Login /> : <Register />}
			</Paper>
		</Box>
	);
};

export default User;
