import React from 'react';
import { View } from 'react-native';
import globalStyles from '../../styles/global';
import CPDBoxComponent from './cpdbox';

const CPDHomeComponent = () => {
	return (
		<View style={globalStyles.container}>
			<CPDBoxComponent
				box={{
					title: 'My CPD Events',
					content: 'See a list of all your CPD events and claim points.',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/cpdevent.png'),
					route: '/cpdevents',
				}}
			/>
			<CPDBoxComponent
				box={{
					title: 'Self Reporting',
					content:
						'Simply upload evidence of your CPD activity and points will be rewarded',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/cpdbooksmall.png'),
					route: '/cpdcategories',
				}}
			/>

			<CPDBoxComponent
				box={{
					title: 'CPD Activity History',
					content:
						'View a history of all your CPD activities and points awarded',
					backgroundColor: '#dcf0fa',
					path: require('../../assets/images/clock.png'),
					route: '/cpdactivities',
				}}
			/>
		</View>
	);
};

export default CPDHomeComponent;
