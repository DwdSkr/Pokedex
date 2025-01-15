import List from '../shared/ListHolder';
import { useContext, useEffect, useState } from 'react';
import { SyncDataContext } from '../../context/SyncDataContext';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';

const Favourites = () => {
	const { favouritesList } = useContext(SyncDataContext);
	const { pokemonList } = useContext(DataContext);
	const { enqueueSnackbar } = useSnackbar();
	const [showInfo, setShowInfo] = useState(false);
	const [currentList, setCurrentList] = useState([]);
	const navigate = useNavigate();

	// sprawdzić w chat czm to się nie zapętla
	useEffect(() => {
		if (showInfo) {
			enqueueSnackbar('dodaj pokemon', {
				variant: 'customSnackBar',
				autoHideDuration: 100 * 1000,
				anchorOrigin: {
					vertical: 'center',
					horizontal: 'center',
				},
				onClose: () => {
					navigate('/');
				},
			});
			setShowInfo(false);
		}
		if (favouritesList.length === 0) {
			setShowInfo(true);
		}
	}, [showInfo, favouritesList, enqueueSnackbar]);

	useEffect(() => {
		setCurrentList(
			pokemonList.filter((el) =>
				favouritesList.map((favEl) => favEl.id).includes(el.id)
			)
		);
	}, [favouritesList]);

	return <List list={currentList} />;
};
export default Favourites;
