import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { useAuth } from '../../providers/auth';
import globalStyles from '../../styles/global';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const AppLayout = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color='#00ff00' />
			</View>
		);
	}

	if (!isAuthenticated) {
		return <Redirect href='/login' />;
	}

	return (
		<Stack
			screenOptions={{
				headerTitleAlign: 'center',
			}}>
			<Stack.Screen
				name='index'
				options={{
					title: 'KeNuM',
				}}
			/>
			<Stack.Screen
				name='error'
				options={{
					headerShown: false,
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
};

export default AppLayout;
