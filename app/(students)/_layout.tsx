import { Stack } from 'expo-router';
import React from 'react';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';

const StudentsLayout = () => {
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
				name='studentshome'
				options={{
					title: 'Student Modules',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>
		</Stack>
	);
};

export default StudentsLayout;
