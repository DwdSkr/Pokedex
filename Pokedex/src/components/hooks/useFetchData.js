import { useState, useEffect } from 'react';

export const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(url);

				if (!response.ok) {
					throw new Error('Network response was not ok!');
				}

				const json = await response.json();
				setData(json);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();

		return () => {
			setIsLoading(false);
		};
	}, [url]);

	return { data, error, isLoading };
};
