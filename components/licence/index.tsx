import React from 'react';
import {View} from 'react-native';
import globalStyles from '../../styles/global';
import LBox from './lbox';
import {ScrollView} from 'react-native';

const LicenceHomeComponent = () => {
	return (
		<View style={globalStyles.container}>
			<ScrollView style={{flex: 1}}>
				<LBox
					box={{
						title: 'Licence Renewal',
						content: 'Complete your annual licence renewal',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/licencesmall.png'),
						route: '/licencecountry',
					}}
				/>

				<LBox
					box={{
						title: 'Licence Applications History',
						content:
							'View a history of all your licence applications, pay for applications, and download licence invoices and receipts',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/clock.png'),
						route: '/licenceapplications',
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default LicenceHomeComponent;
