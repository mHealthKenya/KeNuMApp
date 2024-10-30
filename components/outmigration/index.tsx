import React from 'react';
import {ScrollView, View} from 'react-native';
import globalStyles from '../../styles/global';
import CPDBoxComponent from '../cpds/cpdbox';

const OutmigrationHomeComponent = () => {
	return (
		<View style={globalStyles.container}>
			<ScrollView
				style={{
					flex: 1,
				}}>
				<CPDBoxComponent
					box={{
						title: 'Outmigration Application',
						content: 'Simply complete three steps to make your outmigration application',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/outmigration.png'),
						route: '/outmigrationdetails',
					}}
				/>
				<CPDBoxComponent
					box={{
						title: 'My Outmigration Applications',
						content:
							'See a history of all your outmigration applications, download invoices, pay for invoices and download payment receipts.',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/clock.png'),
						route: '/outmigrationhist',
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default OutmigrationHomeComponent;
