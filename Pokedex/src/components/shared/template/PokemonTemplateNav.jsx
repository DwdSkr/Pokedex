import FavouriteButton from './FavouriteButton';
import ArenaButton from './ArenaButton';
import { Box } from '@mui/material';

const PokemonTemplateNav = ({ details }) => {
	return (
		<Box component='div' sx={{ display: 'flex' }}>
			<FavouriteButton details={details} />
			<ArenaButton details={details} />
		</Box>
	);
};

export default PokemonTemplateNav;
