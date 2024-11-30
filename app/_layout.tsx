import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config as tconfig} from '@tamagui/config/v3';
import {createTamagui, TamaguiProvider} from '@tamagui/core';
import '@tamagui/core/reset.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import React, {useEffect} from 'react';
import {configureFonts, MD2LightTheme, PaperProvider} from 'react-native-paper';
import '../global.css';
import AuthProvider from '../providers/auth';
import CompetencyProvider from '../providers/competency';
import ErrorProvider from '../providers/error';
import RegistrationProvider from '../providers/registrationprovider';
import RotationAreasProvider from '../providers/rotationareas';
import RotationCompetenciesProvider from '../providers/rotationcompetencies';
import SearchProvider from '../providers/search';

const tamaguiConfig = createTamagui(tconfig);

const client = new QueryClient();

SplashScreen.preventAutoHideAsync();

type Conf = typeof tamaguiConfig;
declare module '@tamagui/core' {
	interface TamaguiCustomConfig extends Conf {}
}

const RootLayout = () => {
	async function onFetchUpdateAsync() {
		try {
			const update = await Updates.checkForUpdateAsync();

			if (update.isAvailable) {
				await Updates.fetchUpdateAsync();
				await Updates.reloadAsync();
			}
		} catch (error) {
			alert(error);
			// You can also add an alert() to see the error message in case of an error when fetching updates.
			return;
		}
	}

	useEffect(() => {
		onFetchUpdateAsync();
	}, []);

	const [loaded, error] = useFonts({
		'San-Regular': require('../assets/fonts/san.otf'),
		'San-Bold': require('../assets/fonts/sanbold.otf'),
		'San-Italic': require('../assets/fonts/italic.otf'),
		'Space-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
		'SF-Pro': require('../assets/fonts/SF-Pro.ttf'),
		normal: require('../assets/fonts/RobotoMono-Regular.ttf'),
		bold: require('../assets/fonts/RobotoMono-Bold.ttf'),
		italic: require('../assets/fonts/RobotoMono-Italic.ttf'),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	const fontConfig = {
		web: {
			regular: {
				fontFamily: 'normal',
				fontWeight: 'normal',
			},
			medium: {
				fontFamily: 'normal',
				fontWeight: 'normal',
			},
			light: {
				fontFamily: 'normal',
				fontWeight: 'normal',
			},
			thin: {
				fontFamily: 'normal',
				fontWeight: 'normal',
			},
		},
		ios: {
			regular: {
				fontFamily: 'normal',
				fontWeight: 'normal',
			},
			medium: {
				fontFamily: 'normal',
				fontWeight: 'normal',
			},
			light: {
				fontFamily: 'normal',
				fontWeight: 'normal',
			},
			thin: {
				fontFamily: 'normal',
				fontWeight: 'normal',
			},
		},
		android: {
			regular: {
				fontFamily: 'normal',
				fontWeight: 'normal',
			},
			medium: {
				fontFamily: 'normal',
				fontWeight: 'normal',
			},
			light: {
				fontFamily: 'normal',
				fontWeight: 'normal',
			},
			thin: {
				fontFamily: 'normal',
				fontWeight: 'normal',
			},
		},
	} as const;

	const theme = {
		...MD2LightTheme,
		fonts: configureFonts({config: fontConfig, isV3: false}),
	};

	return (
		<GluestackUIProvider config={config}>
			<TamaguiProvider config={tamaguiConfig}>
				<PaperProvider theme={theme}>
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
				</PaperProvider>
			</TamaguiProvider>
		</GluestackUIProvider>
	);
};

export default RootLayout;
