import React from 'react';
import { View } from 'react-native';
import globalStyles from '../../styles/global';
import RegistrationBox from './regbox';

const RegHome = () => {
	return (
		<View style={globalStyles.container}>
			<RegistrationBox
				box={{
					title: 'Registration Application',
					content:
						'Upload your current passport photo to apply for registration as a nurse',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/registration.png'),
					route: '/registrationapplication',
				}}
			/>

			<RegistrationBox
				box={{
					title: 'Registration Applications History',
					content:
						'View a history of all your rotation applications, pay for applications, and download registration invoices and receipts',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/clock.png'),
					route: '/registrationapplications',
				}}
			/>
		</View>
	);
};

export default RegHome;
