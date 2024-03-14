import React from 'react';
import { View } from 'react-native';
import globalStyles from '../../styles/global';
import OutBoxComponent from './outmigrationbox';

const OutMigrationHomeComponent = () => {
	return (
		<View style={globalStyles.container}>
			<OutBoxComponent
				box={{
					title: 'Apply Out-Migration',
					content: 'See a list of all your CPD events and claim points.',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/cpdevent.png'),
					route: '/cpdevents',
				}}
			/>
			<OutBoxComponent
				box={{
					title: 'Out-Migration History',
					content:
						'Simply upload evidence of your CPD activity and points will be rewarded',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/cpdbooksmall.png'),
					route: '/cpdcategories',
				}}
			/>
		</View>
	);
};

export default OutMigrationHomeComponent;
