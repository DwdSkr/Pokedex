import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Favorites from './components/subpages/Favourites.jsx';
import Arena from './components/subpages/arena/Arena.jsx';
import Ranking from './components/subpages/ranking/Ranking.jsx';
import Edit from './components/subpages/edit/Edit.jsx';
import Home from './components/subpages/Home.jsx';
import User from './components/subpages/user/User.jsx';
import LogOut from './components/subpages/user/LogOut.jsx';

const router = createBrowserRouter([
	{
		element: <App />,
		path: '/*',
		children: [
			{ element: <Home />, path: '*' },
			{ element: <Favorites />, path: 'favourites' },
			{ element: <Arena />, path: 'arena' },
			{ element: <Ranking />, path: 'ranking' },
			{ element: <Edit />, path: 'edit' },
			{ element: <User />, path: 'user' },
			{ element: <LogOut />, path: 'logout' },
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
