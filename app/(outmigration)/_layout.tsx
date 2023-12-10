import { Stack } from 'expo-router';
import React from 'react';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';

const OutMigrationLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerTitleAlign: 'center',
				headerStyle: {
					backgroundColor: '#0445b5',
				},

				headerTitleStyle: {
					color: '#FFF',
				},
			}}>
			<Stack.Screen
				name='applyoutmigration'
				options={{
					title: 'Out Migration',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>
		</Stack>
	);
};

export default OutMigrationLayout;
