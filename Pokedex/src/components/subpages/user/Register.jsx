import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoginContext } from '../../../context/LoginContext';
import { useContext } from 'react';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';

const Register = () => {
	const { registerUser } = useContext(LoginContext);
	const registerSchema = z
		.object({
			username: z.string().min(3, { message: 'Nieprawidłowy login' }),
			email: z.string().email('Nieprawidłowy e-mail'),
			password: z
				.string()
				.regex(
					/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
					'Hasło musi zawierać: co najmniej 1 dużą literę, co najmniej 1 znak specjalny, co najmniej 1 cyfra, nie może być krótsze niż 8 znaków'
				),
			confirm: z.string().min(1, { message: 'Powtórz hasło' }),
		})
		.refine((data) => data.confirm === data.password, {
			message: 'Hasła nie są identyczne',
			path: ['confirm'],
		});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
	});

	return (
		<form onSubmit={handleSubmit(registerUser)}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '20px',
					marginTop: '20px',
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
					{...register('email')}
					type='text'
					name='email'
					placeholder='E-mail'
					error={errors.email ? true : false}
					helperText={errors.email ? errors.email.message : ''}
				/>

				<TextField
					{...register('password')}
					type='password'
					name='password'
					placeholder='Hasło'
					error={errors.password ? true : false}
					helperText={errors.password ? errors.password.message : ''}
					sx={{ maxWidth: '230px' }}
				/>

				<TextField
					{...register('confirm')}
					type='password'
					name='confirm'
					placeholder='Powtórz hasło'
					error={errors.confirm ? true : false}
					helperText={errors.confirm ? errors.confirm.message : ''}
				/>

				<Button type='submit'>Rejestracja</Button>
			</Box>
		</form>
	);
};
export default Register;
