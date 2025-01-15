import { createContext, useCallback, useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetchData';
import useNotifications from '../hooks/useNotifications';

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
	const { handleError } = useNotifications();
	const { fetchData } = useFetch();

	const [fetch, setFetch] = useState(false);
	const [pokemonList, setPokemonList] = useState([]);

	const fetchDetails = useCallback(async () => {
		try {
			const responseFullList = await fetchData(
				`https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`
			);
			const details = await Promise.all(
				responseFullList.results.map(async (el) => {
					const responseSingle = await fetchData(el.url);

					return {
						id: responseSingle.id.toString(),
						name: responseSingle.name,
						height: responseSingle.height.toString(),
						base_experience: responseSingle.base_experience.toString(),
						weight: responseSingle.weight.toString(),
						ability: responseSingle.abilities[0].ability.name,
						sprite: responseSingle.sprites.front_default,
					};
				})
			);
			setPokemonList(details);
		} catch (error) {
			handleError('Błąd pobierania danych: ' + error);
		}
	}, [fetchData, handleError]);

	useEffect(() => {
		setFetch(true);
	}, []);

	useEffect(() => {
		if (fetch) {
			fetchDetails();
			setFetch(false);
		}
	}, [fetch, fetchDetails]);

	return (
		<DataContext.Provider
			value={{
				pokemonList,
				setPokemonList,
				fetchDetails,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
