import {Stack} from 'expo-router';
import React from 'react';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';

const EcitizenLayout = () => {
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
				name='ecitizen'
				options={{
					title: 'E-Citizen Payments',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>
		</Stack>
	);
};

export default EcitizenLayout;
