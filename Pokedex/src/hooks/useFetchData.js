import { useEffect, useState } from 'react';
import useNotifications from './useNotifications';

export const useFetch = () => {
	const { handleError } = useNotifications();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (error) {
			handleError('Błąd pobierania danych z bazy ' + error);
		}
	}, [error]);

	const fetchData = async (url) => {
		setIsLoading(true);
		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error('Network response was not ok!');
			}
			const json = await response.json();
			return json;
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { error, isLoading, fetchData };
};
