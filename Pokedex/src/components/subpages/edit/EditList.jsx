import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import PokemonTable from '../../shared/Table';
import { TableRow, TableCell, Button, Paper, Box } from '@mui/material';

const EditList = ({ toggleEdit }) => {
	const { pokemonList } = useContext(DataContext);
	const tableHeader = ['id', 'wygląd', 'nazwa', ''];
	const headerContent = tableHeader.map((el) => {
		return (
			<TableCell
				key={el}
				sx={{
					height: el === 'wygląd' ? '140px' : '60px',
				}}
			>
				{el.toUpperCase()}
			</TableCell>
		);
	});
	const bodyContent = pokemonList.map((el) => {
		return [
			<TableRow
				key={el.id}
				sx={{
					'& td': {
						textAlign: 'center',
						height: '60px',
						display: 'flex',
						justifyContent: 'center',
					},
				}}
			>
				<TableCell>{el.id}</TableCell>
				<TableCell sx={{ height: '140px !important' }}>
					<Box
						component='img'
						src={el.sprite}
						alt={el.name}
						sx={{
							transform: {
								xs: 'scale(0.7)',
								sm: 'scale(1)',
								lg: 'scale(1.2)',
							},
						}}
					/>
				</TableCell>
				<TableCell>{el.name}</TableCell>
				<TableCell>
					<Button
						onClick={() => toggleEdit(el)}
						key={`${el.id}-edit`}
						variant='contained'
						sx={{
							padding: {
								xs: '6px',
								sm: '6px 16px',
							},
						}}
					>
						Edytuj
					</Button>
				</TableCell>
			</TableRow>,
		];
	});
	return (
		<Paper sx={{ width: '90%', padding: '20px', minWidth: '320px' }}>
			<PokemonTable head={headerContent} body={bodyContent} />
		</Paper>
	);
};

export default EditList;
