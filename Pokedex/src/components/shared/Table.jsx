import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import { TablePagination } from '@mui/material';

const PokemonTable = ({ head, body }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(15);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Box
			sx={{
				width: '100%',
			}}
		>
			<TableContainer>
				<Table
					sx={{
						tableLayout: 'fixed',
						width: '100%',
						display: 'flex',
					}}
				>
					<TableHead sx={{ position: 'sticky' }}>
						<TableRow
							sx={{
								'& th': {
									display: 'flex',
									textAlign: 'center',
									fontWeight: 'bold',
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: 'primary.main',
									padding: { xs: '6px', md: '8px', lg: '16px' },
									fontSize: { xs: '12px', md: '14px', lg: '16px' },
									color: 'black',
								},
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{head}
						</TableRow>
					</TableHead>
					<TableBody
						sx={{
							display: 'flex',
							flexDirection: 'row',
							width: '100%',
							overflow: 'auto',
							'& tr': {
								display: 'flex',
								flexDirection: 'column',
								borderWidth: '1px',
								borderStyle: 'solid',
							},
						}}
					>
						{body.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
					</TableBody>
				</Table>
			</TableContainer>

			<TablePagination
				component='div'
				rowsPerPageOptions={[15, 30, 45]}
				count={body.length}
				page={page}
				rowsPerPage={rowsPerPage}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				sx={{
					'.MuiTablePagination-selectLabel': {
						display: 'none',
					},
				}}
			/>
		</Box>
	);
};

export default PokemonTable;
