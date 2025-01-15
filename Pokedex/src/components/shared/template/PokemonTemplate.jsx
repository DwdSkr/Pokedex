import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActionArea,
	Box,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import { ArenaContext } from '../../../context/ArenaContext';
import PokemonTemplateNav from './PokemonTemplateNav';
import useDetailsCard from './DetailsCard';

const PokemonTemplate = ({ pokemonDetails, blockModalFunction = false }) => {
	const { isLoggedIn } = useContext(LoginContext);
	const { pokemonStats } = useContext(ArenaContext);
	const { createCard, handleOpen } = useDetailsCard();
	const [currentStat, setCurrentStat] = useState([]);

	useEffect(() => {
		setCurrentStat(pokemonStats.filter((el) => el.id === pokemonDetails.id));
	}, [pokemonStats, pokemonDetails]);
	return (
		<Card
			sx={{
				width: '100%',
				minWidth: '300px',
				height: 'auto',
				'&:hover': {
					transform: !blockModalFunction ? 'scale(1.05)' : '',
				},
			}}
		>
			{createCard(pokemonDetails)}
			<CardActionArea
				onClick={() => {
					!blockModalFunction ? handleOpen(pokemonDetails.id) : '';
				}}
			>
				{isLoggedIn && currentStat.length !== 0 && (
					<Box
						sx={{
							width: '50px',
							height: '50px',
							backgroundColor: 'black',
							borderBottomRightRadius: '10px',
							position: 'absolute',
						}}
					>
						<Typography sx={{ color: 'white' }}>
							W: {currentStat[0].stats.win}
						</Typography>
						<Typography sx={{ color: 'white' }}>
							L: {currentStat[0].stats.lose}
						</Typography>
					</Box>
				)}

				<CardMedia
					component='img'
					image={pokemonDetails.sprite}
					alt={pokemonDetails.name}
					sx={{ width: '200px', height: 'auto', margin: 'auto' }}
				/>
				<Typography variant='h5' sx={{ textAlign: 'center' }}>
					{pokemonDetails.name.slice(0, 1).toUpperCase() +
						pokemonDetails.name.slice(1)}
				</Typography>
				<CardContent
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
						gap: '10px',
						marginBottom: '10px',
						textAlign: 'center',
					}}
				>
					<Box sx={{ width: '45%' }}>
						<Typography>{pokemonDetails.height}</Typography>
						<Typography sx={{ fontWeight: 'bold' }}>Wzrost</Typography>
					</Box>
					<Box sx={{ width: '45%' }}>
						<Typography>{pokemonDetails.base_experience}</Typography>
						<Typography sx={{ fontWeight: 'bold' }}>Doświadczenie</Typography>
					</Box>
					<Box sx={{ width: '45%' }}>
						<Typography>{pokemonDetails.weight}</Typography>
						<Typography sx={{ fontWeight: 'bold' }}>Waga</Typography>
					</Box>
					<Box sx={{ width: '45%' }}>
						<Typography>{pokemonDetails.ability}</Typography>
						<Typography sx={{ fontWeight: 'bold' }}>Umiejętność</Typography>
					</Box>
				</CardContent>
			</CardActionArea>
			{isLoggedIn && <PokemonTemplateNav details={pokemonDetails} />}
		</Card>
	);
};

export default PokemonTemplate;
