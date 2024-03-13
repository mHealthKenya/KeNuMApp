import React from 'react';
import { View } from 'react-native';
import globalStyles from '../../styles/global';
import LBox from '../licence/lbox';
import CPDBoxComponent from '../cpds/cpdbox';


const PrivatePracticeHome = () => {
	return (
		<View style={globalStyles.container}>
			<CPDBoxComponent
				box={{
					title: 'Private Practice Licence Application',
					content: 'Apply for your private practice licence here.',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/cpdevent.png'),
					route: '/applyprivate',
				}}
			/>
			

			<CPDBoxComponent
				box={{
					title: 'Private Practice Applications',
					content:
						'View a history of all your private practice licence applications, download invoices and payment receipts',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/clock.png'),
					route: '/privateapplications',
				}}
			/>
		</View>
	);
};

export default PrivatePracticeHome;
