import { createContext, useState } from 'react';
import useDbManagment from '../hooks/useDbManagment';
import useNotifications from '../hooks/useNotifications';
import { useNavigate } from 'react-router-dom';

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState('');

	const { handleError, handleSucces, handleWarning, handleInfo } =
		useNotifications();
	const { getData, postData } = useDbManagment();

	const homeRoute = { name: 'Home', id: 1, path: '/' };

	const pathRoutes = [
		{ name: 'Ulubione', id: 3, path: '/favourites' },
		{ name: 'Arena', id: 4, path: '/arena' },
		{ name: 'Edytuj', id: 5, path: '/edit' },
		{ name: 'Ranking', id: 6, path: '/ranking' },
		{
			name: isLoggedIn ? 'Wyloguj' : 'Dołącz do nas',
			id: 2,
			path: isLoggedIn ? '/logout' : '/user',
		},
	];

	const navigate = useNavigate('/');

	const loginUser = async (event) => {
		try {
			const searchForUser = await getData(`users?username=${event.username}`);
			if (searchForUser[0].password === event.password) {
				setIsLoggedIn(true);
				setUser(event.username);
				handleSucces(`Witaj ${event.username}`);
				navigate('/');
			} else {
				handleWarning(
					'Nie znaleziono użytkownika, sprawdź czy podałeś pravidłowe dane logowania.'
				);
			}
		} catch (e) {
			handleError('Wystąpił błąd podczas logowania');
			console.log(e);
		}
	};

	const registerUser = async (event) => {
		try {
			const searchForUser = await getData(`users`);
			if (searchForUser.some((el) => el.username === event.username)) {
				handleWarning('Podany login jest już zajęty');
			} else {
				const idMath =
					searchForUser.length > 0
						? Math.max(...searchForUser.map((user) => user.id))
						: 0;
				await postData('users', {
					id: (idMath + 1).toString(),
					username: event.username,
					password: event.password,
					email: event.email,
				});

				handleSucces('Zarejestrowano pomyślnie');
				setTimeout(() => {
					loginUser(event);
				}, 1 * 1000);
			}
		} catch (error) {
			handleError(`Wystąpił błąd podczas rejestracji`);
			console.log(error);
		}
	};

	const logoutUser = () => {
		setIsLoggedIn(false);
		setUser('');
		navigate('/');
		handleInfo('Pomyślnie wylogowano', { variant: 'info' });
	};

	return (
		<LoginContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				user,
				setUser,
				loginUser,
				registerUser,
				homeRoute,
				pathRoutes,
				logoutUser,
			}}
		>
			{children}
		</LoginContext.Provider>
	);
};
