import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';
import { useAuth } from '../../providers/auth';

const InternshipLayout = () => {
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
				name='internshipapply'
				options={{
					title: 'Internship Application',
					headerLeft: () => <ProfileHeaderLeft />,

					headerTitleStyle: {
						color: '#eaf2fa',
					},
				}}
			/>

			<Stack.Screen
				name='internshiphistory'
				options={{
					title: 'Internships History',
					headerLeft: () => <ProfileHeaderLeft />,

					headerTitleStyle: {
						color: '#eaf2fa',
					},
				}}
			/>

			<Stack.Screen
				name='internshippay'
				options={{
					headerShown: false,
					presentation: 'modal',
				}}
			/>

			<Stack.Screen
				name='internshippayhistory'
				options={{
					headerShown: false,
					presentation: 'modal',
				}}
			/>

			<Stack.Screen
				name='checkin'
				options={{
					title: 'Internship Checkin',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>

			<Stack.Screen
				name='verifyotpcheck'
				options={{
					headerShown: false,
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
};

export default InternshipLayout;
