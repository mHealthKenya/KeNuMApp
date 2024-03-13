import { Stack } from 'expo-router';
import React from 'react';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';

const PrivatePracticeLayout = () => {
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
				name='privatepracticelanding'
				options={{
					title: 'Private Practice',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>
			<Stack.Screen
				name='applyprivate'
				options={{
					title: 'Private Practice Application',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>
			<Stack.Screen
				name='privateapplications'
				options={{
					title: 'Private Practice History',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>

			<Stack.Screen
				name='paypractice'
				options={{
					title: 'Private Practice Payment',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>
		</Stack>
	);
};

export default PrivatePracticeLayout;
