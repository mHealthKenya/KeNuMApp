import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import React from 'react';
import AuthProvider from '../providers/auth';
import ErrorProvider from '../providers/error';

const client = new QueryClient();

const RootLayout = () => {
	return (
		<GluestackUIProvider config={config}>
			<AuthProvider>
				<QueryClientProvider client={client}>
					<ErrorProvider>
						<Slot />
					</ErrorProvider>
				</QueryClientProvider>
			</AuthProvider>
		</GluestackUIProvider>
	);
};

export default RootLayout;
