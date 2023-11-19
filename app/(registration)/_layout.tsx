import { Stack } from 'expo-router';
import React from 'react';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';

const RegistrationLayout = () => {
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
				name='registrationhome'
				options={{
					title: 'My Registrations',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>
			<Stack.Screen
				name='registrationapplication'
				options={{
					title: 'Apply For Registration',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>

			<Stack.Screen
				name='registrationapplications'
				options={{
					title: 'Registrations History',
					headerLeft: () => <ProfileHeaderLeft />,
				}}
			/>

			<Stack.Screen
				name='payreg'
				options={{
					headerShown: false,
					presentation: 'modal',
				}}
			/>

			<Stack.Screen
				name='payreghist'
				options={{
					headerShown: false,
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
};

export default RegistrationLayout;
