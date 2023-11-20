import { Stack } from 'expo-router';
import React from 'react';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';
import CPDCategoriesProvider from '../../providers/cpdcategories';

const RegistrationLayout = () => {
	return (
		<CPDCategoriesProvider>
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
					name='cpdhome'
					options={{
						title: 'My CPDS',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='cpdcategories'
					options={{
						title: 'Select Category',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='selfreporting'
					options={{
						title: 'CPD Self Report',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>

				<Stack.Screen
					name='cpdactivities'
					options={{
						title: 'CPD Activities',
						headerLeft: () => <ProfileHeaderLeft />,
					}}
				/>
			</Stack>
		</CPDCategoriesProvider>
	);
};

export default RegistrationLayout;
