import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

const ProtectedRoutes = () => {
	const { isLoggedIn } = useContext(LoginContext);
	return isLoggedIn ? <Outlet /> : <Navigate to={'/'} />;
};

export default ProtectedRoutes;
