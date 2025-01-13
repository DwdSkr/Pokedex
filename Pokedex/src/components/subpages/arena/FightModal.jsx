import { Modal, Card, Button, Typography, Box } from '@mui/material';
import { ArenaContext } from '../../../context/ArenaContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import useDbManagment from '../../../hooks/useDbManagment';
import { SyncDataContext } from '../../../context/SyncDataContext';

const FightModal = ({ winner, draw }) => {
	const {
		isFight,
		setIsFight,
		currentArenaPokemon,
		fetchArenaPokemon,
		fetchStats,
	} = useContext(ArenaContext);
	const { fetchAddPokemon } = useContext(SyncDataContext);
	const { deleteData } = useDbManagment();

	const [modalContent, setModalContent] = useState(
		<Box>
			<Typography>Trwa walka...</Typography>
		</Box>
	);

	useEffect(() => {
		if (!draw) {
			const battleResult = setTimeout(() => {
				setModalContent(
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-evenly',
							height: '400px',
						}}
					>
						<Box
							component='img'
							src={winner.sprite}
							alt={winner.name}
							sx={{ width: '200px' }}
						/>
						<Typography>Zwycięża {winner.name.toUpperCase()}</Typography>
						<Typography>
							Zwycięski pokemon zyskuje 10 punktów doświadczenia
						</Typography>
						<Button onClick={endFight}>Wyjdź</Button>
					</Box>
				);
			}, 3 * 1000);
			return () => clearTimeout(battleResult);
		} else {
			const battleResult = setTimeout(() => {
				setModalContent(
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-evenly',
							height: '400px',
						}}
					>
						<Typography>Walka zakończyła się remisem</Typography>
						<Button onClick={() => endFight()}>Wyjdź</Button>
					</Box>
				);
			}, 3 * 1000);
			return () => clearTimeout(battleResult);
		}
	}, [draw, setModalContent, winner.name, winner.sprite]);

	const endFight = useCallback(() => {
		const clearArena = async () => {
			await Promise.all(
				currentArenaPokemon.map((el) => deleteData(`battlefield/${el.id}`))
			);
			await fetchAddPokemon();
			await fetchArenaPokemon();
			await fetchStats();
		};
		clearArena();

		setIsFight(false);
	}, [currentArenaPokemon, deleteData, fetchArenaPokemon, setIsFight]);

	return (
		<Modal
			sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			open={isFight}
		>
			<Card
				sx={{
					width: '50%',
					minWidth: '300px',
					height: '500px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}
			>
				{modalContent}
			</Card>
		</Modal>
	);
};

export default FightModal;
