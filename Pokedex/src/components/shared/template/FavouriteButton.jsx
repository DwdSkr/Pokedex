import { Button, Box } from '@mui/material';
import useDbManagment from '../../../hooks/useDbManagment';
import { SyncDataContext } from '../../../context/SyncDataContext';
import { useContext, useEffect, useState } from 'react';
import { favourite_checked, favourite_default } from '../../../icons/check';

const FavouriteButton = ({ details }) => {
	const { postData, deleteData } = useDbManagment();
	const { fetchFavourites, favouritesList } = useContext(SyncDataContext);

	const [isFavourite, setIsFavourite] = useState(false);

	useEffect(() => {
		setIsFavourite(favouritesList.some((el) => el.id === details.id));
	}, [favouritesList]);

	function addFavorite() {
		postData('favourites', {
			id: details.id.toString(),
			name: details.name,
		}).then(fetchFavourites);
	}

	function removeFavorite() {
		deleteData(`favourites/${details.id}`).then(fetchFavourites);
	}

	if (isFavourite) {
		return (
			<Button
				sx={{
					width: '50%',
				}}
				variant='text'
				onClick={removeFavorite}
			>
				<Box
					component='img'
					src={favourite_checked}
					alt={details.name}
					sx={{ width: '30px' }}
				/>
			</Button>
		);
	} else {
		return (
			<Button
				sx={{
					width: '50%',
				}}
				variant='text'
				onClick={addFavorite}
			>
				<Box
					component='img'
					src={favourite_default}
					alt={details.name}
					sx={{ width: '30px' }}
				/>
			</Button>
		);
	}
};

export default FavouriteButton;
