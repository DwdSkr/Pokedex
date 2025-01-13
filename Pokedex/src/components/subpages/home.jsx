import { useFetch } from '../hooks/useFetchData';
import PokemonTemplate from '../shared/PokemonTemplate';
import styled from 'styled-components';

const url = 'https://pokeapi.co/api/v2/';

const PokemonList = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
`;

const Home = () => {
	const { data, error, isLoading } = useFetch(`${url}pokemon?limit=15`);

	if (data) {
		return (
			<PokemonList>
				{data.results.map((el) => {
					{
						return <PokemonTemplate key={el.name} name={el.name} />;
					}
				})}
			</PokemonList>
		);
	}
};

export default Home;
