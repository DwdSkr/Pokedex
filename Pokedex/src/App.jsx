import './App.css';
import Nav from './components/shared/Nav';
<<<<<<< Updated upstream
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppProvider';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Favorites from './components/subpages/Favourites.jsx';
import Arena from './components/subpages/arena/Arena.jsx';
import Ranking from './components/subpages/ranking/Ranking.jsx';
import Edit from './components/subpages/edit/Edit.jsx';
import Home from './components/subpages/Home.jsx';
import User from './components/subpages/user/User.jsx';
import LogOut from './components/subpages/user/LogOut.jsx';

function App() {
	return (
		<AppProvider>
			<Nav></Nav>
			<Routes>
				<Route element={<Home />} path='*'></Route>
				<Route element={<User />} path='/user'></Route>
				<Route element={<ProtectedRoutes />}>
					<Route element={<Favorites />} path='/favourites'></Route>
					<Route element={<Ranking />} path='/ranking'></Route>
					<Route element={<Edit />} path='/edit'></Route>
					<Route element={<Arena />} path='/arena'></Route>
					<Route element={<LogOut />} path='/logout'></Route>
				</Route>
			</Routes>
		</AppProvider>
=======
import Home from './components/subpages/home';

function App() {
	return (
		<>
			
			<Nav></Nav>
			<hr />
			<Home></Home>
		</>
>>>>>>> Stashed changes
	);
}

export default App;
