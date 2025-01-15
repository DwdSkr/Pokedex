import PokemonTemplate from './PokemonTemplate';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { useState, useCallback } from 'react';

const useDetailsCard = () => {
	const [openCard, setOpenCard] = useState(null);

	const handleOpen = useCallback((id) => {
		setOpenCard(id);
	}, []);
	const handleClose = useCallback(() => {
		setOpenCard(null);
	}, []);
	const createCard = useCallback(
		(el) => {
			return (
				<Modal open={openCard === el.id} onClose={() => handleClose()}>
					<Box
						sx={{
							width: '50%',
							minWidth: '300px',
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%,-50%)',
						}}
					>
						<PokemonTemplate pokemonDetails={el} blockModalFunction={true} />
					</Box>
				</Modal>
			);
		},
		[openCard, handleClose]
	);
	return { handleOpen, handleClose, createCard };
};
export default useDetailsCard;
