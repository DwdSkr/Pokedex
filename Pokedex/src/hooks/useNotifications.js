import { useSnackbar } from 'notistack';

const useNotifications = () => {
	const { enqueueSnackbar } = useSnackbar();
	const handleSucces = (succesMessage) => {
		enqueueSnackbar(succesMessage, { variant: 'success' });
	};

	const handleError = (errorMessage) => {
		enqueueSnackbar(errorMessage, { variant: 'error' });
	};

	const handleWarning = (warningMessage) => {
		enqueueSnackbar(warningMessage, { variant: 'warning' });
	};

	const handleInfo = (infoMessage, options) => {
		enqueueSnackbar(infoMessage, options);
	};

	return { handleSucces, handleError, handleWarning, handleInfo };
};

export default useNotifications;
