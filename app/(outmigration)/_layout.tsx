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
					title: 'Out Migration Apply',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>

			<Stack.Screen
				name='outmigrationhome'
				options={{
					title: 'Out Migration',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>

			<Stack.Screen
				name='outmigrationhistory'
				options={{
					title: 'Out-Migration History',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>
			<Stack.Screen
				name='payoutmigrate'
				options={{
					title: 'Out-Migration Payment',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>
			
		</Stack>
	);
};

export default OutMigrationLayout;
