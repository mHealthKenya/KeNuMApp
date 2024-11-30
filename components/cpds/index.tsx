import React from 'react';
import {ScrollView, View} from 'react-native';
import CPDBoxComponent from './cpdbox';

const CPDHomeComponent = () => {
	return (
		<View className='flex flex-1'>
			<ScrollView
				style={{
					flex: 1,
				}}>
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
						content: 'Simply upload evidence of your CPD activity and points will be rewarded',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/cpdbooksmall.png'),
						route: '/cpdcategories',
					}}
				/>

				<CPDBoxComponent
					box={{
						title: 'CPD Activity History',
						content: 'View a history of all your CPD activities and points awarded',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/clock.png'),
						route: '/cpdactivities',
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default CPDHomeComponent;
