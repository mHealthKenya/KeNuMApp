import { Stack } from 'expo-router';
import React from 'react';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';

const StudentsLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerTitleAlign: 'center',
				headerStyle: {
					backgroundColor: '#3c6470',
				},

				headerTitleStyle: {
					color: '#FFF',
				},
			}}>
			<Stack.Screen
				name='kpna'
				options={{
					title: 'KPNA',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>
			<Stack.Screen
				name='mak'
				options={{
					title: 'MAK',
					headerLeft: () => <ProfileHeaderLeft color='#000'/>,
					headerStyle: {
						backgroundColor: '#069C54',
					},
	
					headerTitleStyle: {
						color: '#000',
					},
				}}
			/>
		</Stack>
	);
};

export default StudentsLayout;
