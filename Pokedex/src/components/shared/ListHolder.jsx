import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import PokemonTemplate from './template/PokemonTemplate';
import { Box } from '@mui/material';

export const StyledList = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
`;
const List = ({ list }) => {
	const [page, setPage] = useState(1);
	const [currentPokemonList, setCurrentPokemonList] = useState([]);
	const handleChange = (event, value) => {
		setPage(value);
	};
	useEffect(() => {
		setPage(1);
	}, [list]);

	useEffect(() => {
		setCurrentPokemonList(list.slice(page * 15 - 15, page * 15));
	}, [list, page]);

	return (
		<Box sx={{ marginTop: '40px', display: 'flex', flexDirection: 'column' }}>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '40px',
					justifyContent: 'center',
				}}
			>
				{currentPokemonList.map((el) => {
					{
						return (
							<Box key={el.id} sx={{ width: '300px' }}>
								<PokemonTemplate pokemonDetails={el} />
							</Box>
						);
					}
				})}
			</Box>
			<Stack spacing={2} sx={{ alignSelf: 'center', margin: '20px' }}>
				<Pagination
					sx={{
						'& .MuiPaginationItem-root': {
							minWidth: {
								xs: '20px',
								sm: '35px',
								md: '40px',
								xl: '45px',
							},
							height: {
								xs: '20px',
								sm: '35px',
								md: '40px',
								xl: '45px',
							},
							fontSize: {
								xs: '0.8rem',
								sm: '1rem',
								md: '1.2rem',
							},
							margin: {
								xs: '2px',
								sm: '3px',
								md: '4px',
							},
						},
					}}
					boundaryCount={2}
					count={Math.ceil(list.length / 15)}
					page={page}
					onChange={handleChange}
				/>
			</Stack>
		</Box>
	);
};

export default List;
