import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import { DataContext } from '../../../context/DataContext';

const LogOut = () => {
	const { logoutUser } = useContext(LoginContext);
	const { fetchDetails } = useContext(DataContext);

	const [logout, setLogout] = useState(false);

	useEffect(() => {
		if (!logout) {
			setLogout(true);
		} else {
			logoutUser();
			fetchDetails();
		}
	}, [logout, setLogout, logoutUser]);

	return <div></div>;
};

export default LogOut;
