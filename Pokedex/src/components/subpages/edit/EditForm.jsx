import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useEffect } from 'react';

const EditForm = ({ el, onSubmit }) => {
	const editSchema = z.object({
		id: z.string(),
		name: z.string(),
		weight: z.string().min(1, { message: 'pole nie może być puste' }),
		height: z.string().min(1, { message: 'pole nie może być puste' }),
		base_experience: z.string().min(1, { message: 'pole nie może być puste' }),
		ability: z.string(),
		sprite: z.string().url(),
	});
	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(editSchema),
		defaultValues: { ...el },
	});

	useEffect(() => {
		reset({ ...el });
	}, [el, reset]);
	return (
		<Box>
			<Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
				{el.name.slice(0, 1).toUpperCase() + el.name.slice(1)}
			</Typography>
			<Box
				component='img'
				src={el.sprite}
				alt={el.name}
				sx={{ width: '30%', minWidth: '100px', maxWidth: '150px' }}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: '20px',
						justifyContent: 'space-evenly',
						margin: '20px',
					}}
				>
					<Box>
						<Controller
							control={control}
							name='height'
							render={({ field }) => {
								return (
									<TextField
										{...field}
										value={field.value}
										label='Wzrost'
										variant='outlined'
										error={errors.height ? true : false}
										helperText={errors.height ? errors.height.message : false}
									/>
								);
							}}
						/>
					</Box>
					<Box>
						<Controller
							control={control}
							name='weight'
							render={({ field }) => {
								return (
									<TextField
										{...field}
										value={field.value}
										label='Waga'
										variant='outlined'
										error={errors.weight ? true : false}
										helperText={errors.weight ? errors.weight.message : false}
									/>
								);
							}}
						/>
					</Box>
					<Box>
						<Controller
							control={control}
							name='base_experience'
							render={({ field }) => {
								return (
									<TextField
										{...field}
										value={field.value}
										label='Doświadczenie'
										variant='outlined'
										error={errors.base_experience ? true : false}
										helperText={
											errors.base_experience
												? errors.base_experience.message
												: false
										}
									/>
								);
							}}
						/>
					</Box>
				</Box>

				<Button type='submit'>Zmień atrybuty</Button>
			</form>
		</Box>
	);
};
export default EditForm;
