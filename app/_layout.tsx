import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot, Stack } from 'expo-router';
import React from 'react';
import AuthProvider from '../providers/auth';
import ErrorProvider from '../providers/error';
import { ThemeProvider } from '@rneui/themed';
import SearchProvider from '../providers/search';

const client = new QueryClient();

const RootLayout = () => {
	return (
		<GluestackUIProvider config={config}>
			<ThemeProvider>
				<AuthProvider>
					<QueryClientProvider client={client}>
						<ErrorProvider>
							<SearchProvider>
								<Stack
									screenOptions={{
										headerShown: false,
									}}
								/>
							</SearchProvider>
						</ErrorProvider>
					</QueryClientProvider>
				</AuthProvider>
			</ThemeProvider>
		</GluestackUIProvider>
	);
};

export default RootLayout;
