import {
	useState,
	useEffect,
	createContext,
	useContext,
	useCallback,
} from 'react';
import { DataContext } from './DataContext';
import { LoginContext } from './LoginContext';
import useDbManagment from '../hooks/useDbManagment';
import useNotifications from '../hooks/useNotifications';

export const SyncDataContext = createContext(null);

export const SyncDataProvider = ({ children }) => {
	const { isLoggedIn } = useContext(LoginContext);
	const { pokemonList, setPokemonList } = useContext(DataContext);

	const { handleError } = useNotifications();
	const { getData } = useDbManagment();

	const [syncList, setSyncList] = useState([]);
	const [favouritesList, setFavouritesList] = useState([]);

	const fetchAddPokemon = useCallback(async () => {
		try {
			const response = await getData('pokemon-list?_sort=id&order=asc');
			setSyncList(response);
		} catch (e) {
			handleError('Błąd pobierania danych');
			console.log(e);
		}
	}, [getData]);
	const fetchFavourites = useCallback(async () => {
		try {
			const response = await getData('favourites');
			setFavouritesList(response);
		} catch (e) {
			handleError("Błąd pobierania ulubionych pokemonów")
			console.log(e);
		}
	}, [getData]);

	useEffect(() => {
		if (isLoggedIn) {
			fetchAddPokemon();
			fetchFavourites();
		}
	}, [isLoggedIn]);

	useEffect(() => {
		if (syncList.length !== 0) {
			const newSet = new Set();
			const filteredPokemon = syncList.concat(pokemonList).filter((pokemon) => {
				if (newSet.has(pokemon.id)) {
					return false;
				}
				newSet.add(pokemon.id);
				return true;
			});
			setPokemonList(
				filteredPokemon.sort((a, b) => {
					return Number(a.id) - Number(b.id);
				})
			);
		}
	}, [syncList]);

	return (
		<SyncDataContext.Provider
			value={{
				syncList,
				fetchAddPokemon,
				fetchFavourites,
				favouritesList,
				setFavouritesList,
			}}
		>
			{children}
		</SyncDataContext.Provider>
	);
};
