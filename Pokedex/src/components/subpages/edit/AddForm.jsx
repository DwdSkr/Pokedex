import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Button, Typography, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../context/DataContext';
import useDbManagment from '../../../hooks/useDbManagment';
import { SyncDataContext } from '../../../context/SyncDataContext';
import { arrow_right, arrow_left } from '../../../icons/check.js';
import { useNavigate } from 'react-router-dom';
import useNotifications from '../../../hooks/useNotifications.js';

const AddForm = () => {
	const { pokemonList } = useContext(DataContext);
	const { fetchAddPokemon } = useContext(SyncDataContext);
	const { postData } = useDbManagment();
	const navigate = useNavigate();
	const { handleSucces, handleError } = useNotifications();

	const [pokemonNumber, setPokemonNumber] = useState();
	const [currentPokemon, setCurrentPokemon] = useState({
		name: '',
		weight: '',
		height: '',
		base_experience: '',
	});
	const [pokemonValidation, setPokemonValidation] = useState(true);

	const addSchema = z
		.object({
			id: z.string(),
			name: z.string().min(1, { message: 'wypełnij pole' }),
			weight: z.string().min(1, { message: 'wypełnij pole' }),
			height: z.string().min(1, { message: 'wypełnij pole' }),
			base_experience: z.string().min(1, { message: 'wypełnij pole' }),
			ability: z.string(),
			sprite: z.string().url(),
		})
		.refine(
			(data) => !pokemonList.map((pokemon) => pokemon.name).includes(data.name),
			{ message: 'podana nazwa jest zajęta', path: ['name'] }
		);

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(addSchema),
		defaultValues: { ...currentPokemon },
	});

	useEffect(() => {
		if (currentPokemon) {
			setPokemonValidation(
				pokemonList.map((el) => el.sprite).includes(currentPokemon.sprite)
			);
		}
	}, [currentPokemon, pokemonList]);

	useEffect(() => {
		if (pokemonNumber) {
			const fetchPokemon = async () => {
				try {
					const response = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
					);
					const json = await response.json();
					const {
						id,
						name,
						height,
						weight,
						base_experience,
						abilities,
						sprites,
						...rest
					} = json;
					setCurrentPokemon({
						id: id.toString(),
						name: name,
						height: height.toString(),
						weight: weight.toString(),
						base_experience: base_experience.toString(),
						ability: abilities[0].ability.name,
						sprite: sprites.front_default,
					});
				} catch (e) {
					handleError('Błąd pobierania danych');
					console.log(e);
				}
			};
			fetchPokemon();
		} else {
			setPokemonNumber(151);
		}
	}, [pokemonNumber]);

	useEffect(() => {
		reset({ ...currentPokemon });
	}, [currentPokemon, reset]);

	function onSubmit(data) {
		postData('pokemon-list', {
			id: pokemonNumber.toString(),
			name: data.name,
			weight: data.weight,
			height: data.height,
			base_experience: data.base_experience,
			ability: data.ability,
			sprite: data.sprite,
		}).then(() => {
			fetchAddPokemon();
		});

		handleSucces(`Nowy pokemon ${data.name} został dodany`);

		navigate('/');
	}

	function forwardSprite() {
		setPokemonNumber((prev) => prev + 1);
	}
	function backSprite() {
		setPokemonNumber((prev) => prev - 1);
	}

	if (currentPokemon) {
		return (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					gap: '20px',
				}}
			>
				<Typography variant='h5'>Dodaj Pokemona</Typography>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Box
						sx={{
							display: 'flex',
							gap: '20px',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Box
							component='div'
							sx={{
								display: 'flex',
								justifyContent: 'center',
								flexDirection: 'column',
								width: '30%',
								height: 'auto',
								maxWidth: '150px',
								minWidth: '100px',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									width: '100%',
								}}
							>
								<Box sx={{ width: '50%' }}>
									<Button
										type='button'
										onClick={backSprite}
										variant='text'
										disabled={pokemonNumber != 151 ? false : true}
										sx={{
											width: '100%',
											padding: '0',
											height: 'auto',
											minHeight: '0',
											minWidth: '0',
										}}
									>
										<Box
											component='img'
											src={arrow_left}
											alt='previus pokemon'
											sx={{
												width: '50%',
												height: 'auto',
											}}
										/>
									</Button>
								</Box>
								<Box sx={{ width: '50%' }}>
									<Button
										type='button'
										onClick={forwardSprite}
										variant='text'
										sx={{
											width: '100%',
											padding: '0',
											height: 'auto',
											minHeight: '0',
											minWidth: '0',
										}}
									>
										<Box
											component='img'
											src={arrow_right}
											alt='next pokemon'
											sx={{
												height: 'auto',
												width: '50%',
											}}
										/>
									</Button>
								</Box>
							</Box>
							<Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
								<Box
									component='img'
									src={currentPokemon.sprite}
									alt={currentPokemon.name}
									sx={{ width: '100%', height: 'auto' }}
								/>
								{pokemonValidation && (
									<Box
										sx={{
											width: '100%',
											height: '100%',
											bgcolor: 'rgba(37, 37, 37, 0.5)',
											position: 'absolute',
											top: '0%',
											left: '0%',
											borderRadius: '8px',
										}}
									/>
								)}
							</Box>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								justifyContent: 'space-evenly',
								width: '70%',
								gap: '20px',
							}}
						>
							<div>
								<Controller
									control={control}
									name='name'
									render={({ field }) => {
										return (
											<TextField
												{...field}
												value={field.value}
												label='Nazwa'
												variant='outlined'
												error={errors.name ? true : false}
												helperText={errors.name ? errors.name.message : ''}
											/>
										);
									}}
								/>
							</div>
							<div>
								<Controller
									control={control}
									name='weight'
									render={({ field }) => {
										return (
											<TextField
												{...field}
												value={field.value}
												variant='outlined'
												label='Waga'
												error={errors.weight ? true : false}
												helperText={errors.weight ? errors.weight.message : ''}
											/>
										);
									}}
								/>
							</div>
							<div>
								<Controller
									control={control}
									name='height'
									render={({ field }) => {
										return (
											<TextField
												{...field}
												value={field.value}
												variant='outlined'
												label='Waga'
												error={errors.height ? true : false}
												helperText={errors.height ? errors.height.message : ''}
											/>
										);
									}}
								/>
							</div>
							<div>
								<Controller
									control={control}
									name='base_experience'
									render={({ field }) => {
										return (
											<TextField
												{...field}
												value={field.value}
												variant='outlined'
												label='Doświadczenie'
												error={errors.base_experience ? true : false}
												helperText={
													errors.base_experience
														? errors.base_experience.message
														: ''
												}
											/>
										);
									}}
								/>
							</div>
						</Box>

						<Box sx={{ display: 'flex' }}>
							<Button
								type='submit'
								variant='contained'
								disabled={pokemonValidation ? true : false}
							>
								dodaj
							</Button>
						</Box>
					</Box>
				</form>
			</Box>
		);
	}
};

export default AddForm;
