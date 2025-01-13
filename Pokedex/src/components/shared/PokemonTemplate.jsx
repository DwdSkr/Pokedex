import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActionArea,
} from '@mui/material';

import { useFetch } from '../hooks/useFetchData';

const url = 'https://pokeapi.co/api/v2/';
const PokemonTemplate = ({ name }) => {
	const { data, error, isLoading } = useFetch(`${url}pokemon/${name}`);
	if (data) {
		return (
			<Card sx={{ width: '300px', margin: '10px' }}>
				<CardActionArea>
					<CardMedia
						component='img'
						image={data.sprites.front_default}
						alt={name}
						sx={{ width: '200px', height: 'auto', margin: 'auto' }}
					/>
					<Typography variant='h6'>{name.toUpperCase()}</Typography>
					<CardContent
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'space-between',
						}}
					>
						<Typography sx={{ width: '45%', margin: '3px' }}>
							{data.height}
							<br />
							height
						</Typography>
						<Typography sx={{ width: '45%', margin: '3px' }}>
							{data.base_experience}
							<br />
							base experience
						</Typography>
						<Typography sx={{ width: '45%', margin: '3px' }}>
							{data.weight}
							<br />
							weight
						</Typography>
						<Typography sx={{ width: '45%', margin: '3px' }}>
							{data.abilities[0].ability.name}
							<br />
							ability
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		);
	}
};

export default PokemonTemplate;
