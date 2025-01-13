import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import EditForm from './EditForm';
import AddForm from './AddForm';
import { SyncDataContext } from '../../../context/SyncDataContext';
import useConditionalSendData from '../../../hooks/useConditionalSendData';
import EditList from './EditList';
import { Paper, Button } from '@mui/material';
import useNotifications from '../../../hooks/useNotifications';

const Edit = () => {
	const { syncList, fetchAddPokemon } = useContext(SyncDataContext);
	const { sendData } = useConditionalSendData();
	const { handleSucces } = useNotifications();

	const [editedPokemon, setEditedPokemon] = useState({});
	const [showAddField, setShowAddField] = useState(true);

	function toggleEdit(el) {
		setShowAddField(false);
		setEditedPokemon(el);
	}
	function editSubmit(data) {
		sendData(syncList, 'pokemon-list', data)
			.then(() => {
				fetchAddPokemon();
			})
			.then(() => handleSucces(`Pomyślnie zaaktualizowano ${data.name}`));

		setShowAddField(true);
	}
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
				gap: '20px',
			}}
		>
			<Paper
				sx={{
					height: 'auto',
					width: '60%',
					padding: '30px',
					minWidth: '320px',
				}}
			>
				{showAddField && <AddForm />}
				{!showAddField && <EditForm onSubmit={editSubmit} el={editedPokemon} />}
			</Paper>
			{!showAddField && (
				<Button onClick={() => setShowAddField(true)}>
					Powrót do dodania pokemona
				</Button>
			)}
			<EditList toggleEdit={toggleEdit} />
		</Box>
	);
};
export default Edit;
