import { useEffect, useState, useCallback } from 'react';
import useNotifications from '../hooks/useNotifications';
const baseUrl = 'http://localhost:3000/';

const useDbManagment = () => {
	const [error, setError] = useState(null);
	const { handleError } = useNotifications();

	useEffect(() => {
		if (error) {
			handleError('Błąd połączenia z bazą ' + error);
			setError(null);
		}
	}, [error, handleError]);

	const fetchRequest = useCallback(async (path, options = {}) => {
		try {
			const response = await fetch(`${baseUrl}${path}`, options);
			if (!response.ok) {
				throw new Error(`HTTP error Status: ${response.status}`);
			}
			const json = response.json();
			return json;
		} catch (e) {
			setError(`fetchError: ${e}`);
			throw e;
		}
	}, []);

	const getData = useCallback(async (path) => {
		try {
			const result = await fetchRequest(path);
			return result;
		} catch (e) {
			setError(`getError: ${e}`);
		}
	}, [fetchRequest]);

	const postData = useCallback(async (path, body) => {
		try {
			await fetchRequest(`${path}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
		} catch (e) {
			setError(`postError: ${e}`);
		}
	}, [fetchRequest]);

	const deleteData = useCallback(async (path) => {
		try {
			await fetchRequest(path, { method: 'DELETE' });
		} catch (e) {
			setError(`deleteError: ${e}`);
		}
	}, [fetchRequest]);

	const updateData = useCallback(async (path, body) => {
		try {
			await fetchRequest(path, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
		} catch (e) {
			setError(`putError: ${e}`);
		}
	}, [fetchRequest]);

	return { error, getData, postData, deleteData, updateData };
};

export default useDbManagment;
