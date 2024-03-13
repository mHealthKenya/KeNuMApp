import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Slot, Stack} from 'expo-router';
import React, {useEffect} from 'react';
import AuthProvider from '../providers/auth';
import ErrorProvider from '../providers/error';
import {ThemeProvider} from '@rneui/themed';
import SearchProvider from '../providers/search';
import RotationAreasProvider from '../providers/rotationareas';
import RotationCompetenciesProvider from '../providers/rotationcompetencies';
import CompetencyProvider from '../providers/competency';
import RegistrationProvider from '../providers/registrationprovider';
import * as Updates from 'expo-updates';

const client = new QueryClient();

const RootLayout = () => {
	async function onFetchUpdateAsync() {
		try {
			const update = await Updates.checkForUpdateAsync();

			if (update.isAvailable) {
				await Updates.fetchUpdateAsync();
				await Updates.reloadAsync();
			}
		} catch (error) {
			// You can also add an alert() to see the error message in case of an error when fetching updates.
			return;
		}
	}

	useEffect(() => {
		onFetchUpdateAsync();
	}, []);

	return (
		<GluestackUIProvider config={config}>
			<ThemeProvider>
				<QueryClientProvider client={client}>
					<AuthProvider>
						<RotationAreasProvider>
							<RotationCompetenciesProvider>
								<CompetencyProvider>
									<RegistrationProvider>
										<ErrorProvider>
											<SearchProvider>
												<Stack
													screenOptions={{
														headerShown: false,
													}}
												/>
											</SearchProvider>
										</ErrorProvider>
									</RegistrationProvider>
								</CompetencyProvider>
							</RotationCompetenciesProvider>
						</RotationAreasProvider>
					</AuthProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</GluestackUIProvider>
	);
};

export default RootLayout;
