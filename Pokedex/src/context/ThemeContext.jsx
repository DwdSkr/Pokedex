import { useState, createContext, useMemo, useContext } from 'react';
import {
	createTheme,
	CssBaseline,
	ThemeProvider as MuiThemeProvider,
} from '@mui/material';

export const ThemeContext = createContext(null);

export const useThemeContext = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useThemeContext must be used within a ThemeProvider');
	}
	return context;
};

export const ThemeProvider = ({ children }) => {
	const [mode, setMode] = useState('light');

	const toggleTheme = () => {
		setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	const theme = useMemo(() => {
		const palette =
			mode === 'light'
				? {
						primary: { main: '#A294F9' }, //
						secondary: { main: '#E5D9F2' }, //
						background: {
							default: '#F6F5F2', // tło strony
							paper: '#F0EBE3', //paper,card
						},
				  }
				: {
						primary: { main: '#90caf9' },
						secondary: { main: '#f48fb1' },
						background: { default: '#121212', paper: '#1d1d1d' },
				  };

		return createTheme({
			palette: {
				mode,
				...palette,
			},
			components: {
				MuiButton: {
					defaultProps: {
						variant: 'contained',
					},
				},
			},
		});
	}, [mode]);

	return (
		<ThemeContext.Provider value={{ mode, toggleTheme }}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};
