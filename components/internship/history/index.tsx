import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {View} from 'react-native';
import BoxImage, {InternBox} from '../../shared/BoxImage';

const data: InternBox[] = [
	{
		title: 'Internship Applications',
		content: 'View a history of all internship applications, make payments, download invoices and receipts.',
		path: require('../../../assets/images/nursesmall.png'),
		route: '/internshiphistory',
		backgroundColor: '#FFFFFF',
	},

	{
		title: 'Internship Check Ins',
		content: 'See a history of all you internship check ins.',
		path: require('../../../assets/images/clock.png'),
		route: '/checkins',
		backgroundColor: '#FFFFFF',
	},

	{
		title: 'Internship Rotations',
		content: 'View a history of all your internship rotations and request for competency verification',
		path: require('../../../assets/images/rotationssmall.png'),
		route: '/rotationactivities',
		backgroundColor: '#FFFFFF',
	},

	{
		title: 'Internship Transfers',
		content: 'View a history of all internship transfers applications and their approval status.',
		path: require('../../../assets/images/transfersmall.png'),
		route: '/transferhist',
		backgroundColor: '#FFFFFF',
	},
];

const AllHistoryComponent = () => {
	return (
		<View className='flex flex-1'>
			<FlashList data={data} estimatedItemSize={20} renderItem={({item}) => <BoxImage data={item} />} />
		</View>
	);
};

export default AllHistoryComponent;
