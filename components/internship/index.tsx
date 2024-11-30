import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {View} from 'react-native';
import BoxImage, {InternBox} from '../shared/BoxImage';

const data: InternBox[] = [
	{
		title: 'Apply For Internship',
		content: 'Embark on a journey towards professional growth!',
		backgroundColor: '#FFFFFF',
		path: require('../../assets/images/nursesmall.png'),
		route: '/internshipapply',
	},

	{
		title: 'Checkin',
		content: 'Verify that you reported to your internship center',
		backgroundColor: '#FFFFFF',
		path: require('../../assets/images/checkin.png'),
		route: '/checkin',
	},

	{
		title: 'Rotations',
		content: 'Verify that you reported to your internship center',
		backgroundColor: '#FFFFFF',
		path: require('../../assets/images/rotationssmall.png'),
		route: '/internshipareas',
	},

	{
		title: 'Transfers',
		content: 'Apply for a change of internship center',
		backgroundColor: '#FFFFFF',
		path: require('../../assets/images/transfersmall.png'),
		route: '/transfer',
	},
	{
		title: 'Internship History',
		content: 'View histories of your internship applications, transfers and check ins',
		backgroundColor: '#FFFFFF',
		path: require('../../assets/images/clock.png'),
		route: '/allhistory',
	},
];

const InternshipComponent = () => {
	return (
		<View className='flex flex-1'>
			<FlashList data={data} estimatedItemSize={20} renderItem={({item}) => <BoxImage data={item} />} />
		</View>
	);
};

export default InternshipComponent;
