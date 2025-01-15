import { Button, Typography, Box } from '@mui/material';
import useDbManagment from '../../../hooks/useDbManagment';
import { useContext } from 'react';
import { ArenaContext } from '../../../context/ArenaContext';
import { useNavigate } from 'react-router-dom';
import {
	add_to_arena,
	remove_from_arena,
	go_to_arena,
} from '../../../icons/check';

const ArenaButton = ({ details }) => {
	const { currentArenaPokemon, fetchArenaPokemon } = useContext(ArenaContext);
	const { postData, deleteData } = useDbManagment();

	const navigate = useNavigate();

	const isInArena = currentArenaPokemon.some((el) => el.id === details.id);

	function addToArena() {
		postData('battlefield', {
			id: details.id.toString(),
			name: details.name,
		}).then(fetchArenaPokemon);
	}
	function removeFromArena() {
		deleteData(`battlefield/${details.id}`).then(fetchArenaPokemon);
	}
	function goToArena() {
		navigate('/arena');
	}

	if (isInArena) {
		return (
			<Button
				sx={{
					width: '50%',
				}}
				variant='text'
				onClick={removeFromArena}
			>
				<Box
					component='img'
					src={remove_from_arena}
					sx={{ width: '30px', marginRight: '10px' }}
				/>
				<Typography>{currentArenaPokemon.length}/2</Typography>
			</Button>
		);
	} else if (currentArenaPokemon.length === 2) {
		return (
			<Button
				sx={{
					width: '50%',
				}}
				variant='text'
				onClick={goToArena}
			>
				<Box
					component='img'
					src={go_to_arena}
					sx={{ width: '30px', marginRight: '10px' }}
				/>
				<Typography>{currentArenaPokemon.length}/2</Typography>
			</Button>
		);
	} else {
		return (
			<Button
				sx={{
					width: '50%',
				}}
				variant='text'
				onClick={addToArena}
			>
				<Box
					component='img'
					src={add_to_arena}
					sx={{ width: '30px', marginRight: '10px' }}
				/>
				<Typography>{currentArenaPokemon.length}/2</Typography>
			</Button>
		);
	}
};

export default ArenaButton;
