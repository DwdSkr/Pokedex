import PokemonTable from '../../shared/Table';
import { TableRow, TableCell, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import useNotifications from '../../../hooks/useNotifications';

const RankingList = ({ array }) => {
	const [currentList, setCurrentList] = useState([]);
	const [reset, setReset] = useState('');
	const { handleInfo } = useNotifications();

	useEffect(() => {
		setCurrentList(array);
	}, [array]);

	const sortFunction = (method) => {
		setReset(method);
		switch (method) {
			case 'win':
				if (reset != method) {
					setCurrentList(
						array
							.filter((el) => el.stats)
							.sort((a, b) => {
								if (Number(a.stats.win) < Number(b.stats.win)) {
									return 1;
								}
								return -1;
							})
					);
				}
				handleInfo('Sortowanie wedłgu ilości zwycięstw.', { variant: 'info' });
				break;

			case 'lose':
				if (reset !== method) {
					setCurrentList(
						array
							.filter((el) => el.stats)
							.sort((a, b) => {
								if (Number(a.stats.lose) < Number(b.stats.lose)) {
									return 1;
								}
								return -1;
							})
					);
				}
				handleInfo('Sortowanie wedłgu ilości porażek.', {
					variant: 'info',
				});
				break;

			case 'experience':
				if (reset !== method) {
					setCurrentList(
						[...array].sort((a, b) => {
							if (Number(a.base_experience) < Number(b.base_experience)) {
								return 1;
							}
							return -1;
						})
					);
				}
				handleInfo('Sortowanie wedłgu doświadczenia pokemona.', {
					variant: 'info',
				});
				break;

			case 'weight':
				if (reset !== method) {
					setCurrentList(
						[...array].sort((a, b) => {
							if (Number(a.weight) < Number(b.weight)) {
								return 1;
							}
							return -1;
						})
					);
				}
				handleInfo('Sortowanie wedłgu wagi pokemona.', { variant: 'info' });
				break;
			case 'height':
				if (reset !== method) {
					setCurrentList(
						[...array].sort((a, b) => {
							if (Number(a.height) < Number(b.height)) {
								return 1;
							}
							return -1;
						})
					);
				}
				handleInfo('Sortowanie wedłgu wzrostu pokemona.', { variant: 'info' });
				break;
		}
	};
	const tableHeaders = [
		{ value: 'id', sort: { enable: false } },
		{ value: 'sprite', sort: { enable: false } },
		{ value: 'nazwa', sort: { enable: false } },
		{ value: 'zwycięstwa', sort: { enable: true, method: 'win' } },
		{ value: 'porażki', sort: { enable: true, method: 'lose' } },
		{ value: 'doświadczenie', sort: { enable: true, method: 'experience' } },
		{ value: 'waga', sort: { enable: true, method: 'weight' } },
		{ value: 'wzrost', sort: { enable: true, method: 'height' } },
	];

	const headerContent = tableHeaders.map((el) => {
		return (
			<TableCell
				key={el.value}
				sx={{
					cursor: 'pointer',
					height: el.value !== 'sprite' ? '60px' : '140px',
				}}
				onClick={
					el.sort.enable
						? () => {
								sortFunction(el.sort.method);
						  }
						: () => {
								setCurrentList(array);
								setReset('');
								handleInfo('Reset sortowania.', { variant: 'info' });
						  }
				}
			>
				{el.value.toUpperCase()}
			</TableCell>
		);
	});

	const bodyContent = currentList.map((el) => {
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
					<img src={el.sprite} alt={el.name} />
				</TableCell>
				<TableCell>{el.name}</TableCell>
				<TableCell>{el.stats ? el.stats.win : ''}</TableCell>
				<TableCell>{el.stats ? el.stats.lose : ''}</TableCell>
				<TableCell>{el.base_experience}</TableCell>
				<TableCell>{el.weight}</TableCell>
				<TableCell>{el.height}</TableCell>
			</TableRow>,
		];
	});
	return (
		<Paper sx={{ width: '100%', padding: '20px' }}>
			<PokemonTable head={headerContent} body={bodyContent} />
		</Paper>
	);
};

export default RankingList;
