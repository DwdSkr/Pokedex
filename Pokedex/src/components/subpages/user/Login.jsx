import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';

const Login = () => {
	const { loginUser } = useContext(LoginContext);

	const loginSchema = z.object({
		username: z.string().min(3, { message: 'Nieprawidłowy login' }),
		password: z
			.string()
			.regex(
				/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				'Nieprawidłowe hasło'
			),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(loginSchema) });

	return (
		<form onSubmit={handleSubmit(loginUser)}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '40px',
					marginTop: '40px',
				}}
			>
				<TextField
					{...register('username')}
					type='text'
					name='username'
					placeholder='Login'
					error={errors.username ? true : false}
					helperText={errors.username ? errors.username.message : ''}
				/>

				<TextField
					{...register('password')}
					type='password'
					name='password'
					placeholder='Hasło'
					error={errors.password ? true : false}
					helperText={errors.password ? errors.password.message : ''}
				/>

				<Button sx={{ marginBottom: '20px' }} type='submit'>
					Logowanie
				</Button>
			</Box>
		</form>
	);
};
export default Login;
