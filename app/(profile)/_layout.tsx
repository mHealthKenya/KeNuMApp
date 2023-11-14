import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';
import { useAuth } from '../../providers/auth';

const ProfileLayout = () => {
	const { user } = useAuth();
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
				name='general'
				options={{
					title: `${user?.Name}`,
					headerLeft: () => <ProfileHeaderLeft />,
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
};

export default ProfileLayout;
