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
					content: 'Apply for Out-Migrations in feww steps',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/cpdevent.png'),
					route: '/applyoutmigration',
				}}
			/>
			<OutBoxComponent
				box={{
					title: 'Out-Migration History',
					content:
						'View All Out-Migrations Application History',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/cpdbooksmall.png'),
					route: '/outmigrationhistory',
				}}
			/>
		</View>
	);
};

export default OutMigrationHomeComponent;
