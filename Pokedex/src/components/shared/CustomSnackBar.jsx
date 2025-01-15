import { useSnackbar, SnackbarContent } from 'notistack';
import { forwardRef, useCallback } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

const CustomSnackBar = forwardRef(({ id }, ref) => {
	const { closeSnackbar } = useSnackbar();

	const close = useCallback(() => {
		closeSnackbar(id);
	}, [id, closeSnackbar]);
	return (
		<SnackbarContent ref={ref}>
			<Paper
				sx={{
					minWidth: '300px',
					minHeight: '200px',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Box
					sx={{
						height: '100%',
						width: '80%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-evenly',
					}}
				>
					<Typography>Brak pokemonów do wyświetlenia.</Typography>
					<Typography>
						Przejdź do strony głównej i dodaj swoje ulubione pokemony.
					</Typography>
					<Button onClick={close}>Rozumiem </Button>
				</Box>
			</Paper>
		</SnackbarContent>
	);
});

CustomSnackBar.displayName = 'CustomSnackBar';

export default CustomSnackBar;
