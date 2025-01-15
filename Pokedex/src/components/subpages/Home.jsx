import List from '../shared/ListHolder';
import { useEffect, useState, useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { Box, TextField } from '@mui/material';

const Home = () => {
	const [search, setSearch] = useState('');
	const { pokemonList } = useContext(DataContext);
	const [currentList, setCurrentList] = useState(pokemonList);

	useEffect(() => {
		setCurrentList(pokemonList.filter((el) => el.name.includes(search)));
	}, [search, pokemonList]);

	return (
		<Box>
			<TextField
				label='Znajdź pokemona...'
				variant='outlined'
				type='text'
				placeholder='Znajdź pokemona...'
				onChangeCapture={(event) => {
					setSearch(event.target.value);
				}}
			/>
			<List list={currentList} />
		</Box>
	);
};

export default Home;
