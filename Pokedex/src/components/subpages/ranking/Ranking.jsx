import { Box } from '@mui/material';
import { ArenaContext } from '../../../context/ArenaContext';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../../context/DataContext';
import RankingList from './RankingList';

const Ranking = () => {
	const { pokemonList } = useContext(DataContext);
	const { pokemonStats } = useContext(ArenaContext);
	const [currentList, setCurrentList] = useState([]);

	useEffect(() => {
		setCurrentList(
			pokemonList.map((elList) => {
				return {
					...elList,
					...pokemonStats.filter((elStat) => elList.id === elStat.id)[0],
				};
			})
		);
	}, [pokemonStats]);

	return (
		<Box sx={{ display: 'flex' }}>
			<RankingList array={currentList} />
		</Box>
	);
};
export default Ranking;
