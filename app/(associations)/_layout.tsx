import { Stack } from 'expo-router';
import React from 'react';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';

const StudentsLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerTitleAlign: 'center',
			}}>
			<Stack.Screen
				name='kpna'
				options={{
					title: 'KPNA',
					headerLeft: () => <ProfileHeaderLeft />,
					headerStyle: {
						backgroundColor: '#3c6470',
					},

					headerTitleStyle: {
						color: '#FFF',
					},
				}}
			/>
		</Stack>
	);
};

export default StudentsLayout;
