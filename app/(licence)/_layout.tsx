import {Stack} from 'expo-router';
import React from 'react';
import ProfileHeaderLeft from '../../components/profile/HeaderLeft';
import WorkStationProvider from '../../providers/workstations';
import LicenceProvider from '../../providers/licenceprovider';

const LicenceLayout = () => {
	return (
		<WorkStationProvider>
			<LicenceProvider>
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
						name='licencehome'
						options={{
							title: 'My Licences',
							headerLeft: () => <ProfileHeaderLeft />,
						}}
					/>

					<Stack.Screen
						name='counties'
						options={{
							title: 'Select County',
							headerLeft: () => <ProfileHeaderLeft />,
						}}
					/>

					<Stack.Screen
						name='workstations'
						options={{
							title: 'Select Work Station',
							headerLeft: () => <ProfileHeaderLeft />,
						}}
					/>

					<Stack.Screen
						name='licenceapplication'
						options={{
							title: 'Licence Application',
							headerLeft: () => <ProfileHeaderLeft />,
						}}
					/>

					<Stack.Screen
						name='licenceapplications'
						options={{
							title: 'My Licence Applications',
							headerLeft: () => <ProfileHeaderLeft />,
						}}
					/>

					<Stack.Screen
						name='licencecountry'
						options={{
							title: 'Region',
							headerLeft: () => <ProfileHeaderLeft />,
						}}
					/>

					<Stack.Screen
						name='paylicencehist'
						options={{
							title: 'Pay For Licence',
							headerLeft: () => <ProfileHeaderLeft />,
						}}
					/>
				</Stack>
			</LicenceProvider>
		</WorkStationProvider>
	);
};

export default LicenceLayout;
