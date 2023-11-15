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
					title: `Bio Data`,
					headerLeft: () => <ProfileHeaderLeft color='#0445b5' />,
					headerStyle: {
						backgroundColor: '#eaf2fa',
					},

					headerTitleStyle: {
						color: '#0445b5',
					},
				}}
			/>

			<Stack.Screen
				name='education'
				options={{
					title: `Education`,
					headerLeft: () => <ProfileHeaderLeft color='#0445b5' />,
					headerStyle: {
						backgroundColor: '#eaf2fa',
					},

					headerTitleStyle: {
						color: '#0445b5',
					},
				}}
			/>

			<Stack.Screen
				name='licence'
				options={{
					title: `Licenses`,
					headerLeft: () => <ProfileHeaderLeft color='#0445b5' />,
					headerStyle: {
						backgroundColor: '#eaf2fa',
					},

					headerTitleStyle: {
						color: '#0445b5',
					},
				}}
			/>

			<Stack.Screen
				name='registration'
				options={{
					title: `Registrations`,
					headerLeft: () => <ProfileHeaderLeft color='#0445b5' />,
					headerStyle: {
						backgroundColor: '#eaf2fa',
					},

					headerTitleStyle: {
						color: '#0445b5',
					},
				}}
			/>

			<Stack.Screen
				name='cpds'
				options={{
					title: `CPD Points`,
					headerLeft: () => <ProfileHeaderLeft color='#0445b5' />,
					headerStyle: {
						backgroundColor: '#eaf2fa',
					},

					headerTitleStyle: {
						color: '#0445b5',
					},
				}}
			/>
		</Stack>
	);
};

export default ProfileLayout;
