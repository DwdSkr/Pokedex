import { LoginProvider } from './LoginContext';
import { DataProvider } from './DataContext';
import { SyncDataProvider } from './SyncDataContext';
import { ArenaProvider } from './ArenaContext';
import { ThemeProvider } from './ThemeContext';
import { SnackbarProvider } from 'notistack';
import CustomSnackBar from '../components/shared/CustomSnackBar';

export const AppProvider = ({ children }) => {
	return (
		<ThemeProvider>
			<SnackbarProvider
				autoHideDuration={3000}
				Components={{ customSnackBar: CustomSnackBar }}
			>
				<LoginProvider>
					<DataProvider>
						<SyncDataProvider>
							<ArenaProvider>{children}</ArenaProvider>
						</SyncDataProvider>
					</DataProvider>
				</LoginProvider>
			</SnackbarProvider>
		</ThemeProvider>
	);
};
