import { Slot } from 'expo-router';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorProvider from '../providers/error';
import AuthProvider from '../providers/auth';

const client = new QueryClient();

const RootLayout = () => {
	return (
		<AuthProvider>
			<QueryClientProvider client={client}>
				<ErrorProvider>
					<Slot />
				</ErrorProvider>
			</QueryClientProvider>
		</AuthProvider>
	);
};

export default RootLayout;
