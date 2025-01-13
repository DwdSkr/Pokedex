import {
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
} from 'react';
import { LoginContext } from './LoginContext';
import useDbManagment from '../hooks/useDbManagment';
import useNotifications from '../hooks/useNotifications';

export const ArenaContext = createContext(null);

export const ArenaProvider = ({ children }) => {
	const { isLoggedIn } = useContext(LoginContext);
	const { getData } = useDbManagment();
	const { handleError } = useNotifications();

	const [currentArenaPokemon, setCurrentArenaPokemon] = useState([]);
	const [pokemonStats, setPokemonStats] = useState([]);
	const [isFight, setIsFight] = useState(false);

	const fetchArenaPokemon = useCallback(async () => {
		try {
			const response = await getData('battlefield');
			setCurrentArenaPokemon(response);
		} catch (e) {
			handleError('Błąd pobierania pokemonów na arenie');
			console.log(e);
		}
	}, [getData]);

	const fetchStats = useCallback(async () => {
		try {
			const response = await getData('ranking');
			setPokemonStats(response);
		} catch (e) {
			handleError('Błąd pobierania statystyk');
			console.log(e);
		}
	}, [getData]);

	useEffect(() => {
		if (isLoggedIn) {
			fetchArenaPokemon();
			fetchStats();
		}
	}, [isLoggedIn]);

	return (
		<ArenaContext.Provider
			value={{
				currentArenaPokemon,
				fetchArenaPokemon,
				isFight,
				setIsFight,
				pokemonStats,
				fetchStats,
			}}
		>
			{children}
		</ArenaContext.Provider>
	);
};
