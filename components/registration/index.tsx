import React from 'react';
import {View} from 'react-native';
import BoxImage, {InternBox} from '../shared/BoxImage';
import {FlashList} from '@shopify/flash-list';

const data: InternBox[] = [
	{
		title: 'Registration Application',
		content: 'Upload your current passport photo to apply for registration as a nurse',
		backgroundColor: '#FFFFFF',
		path: require('../../assets/images/registration.png'),
		route: '/registrationapplication',
	},

	{
		title: 'Registration Applications History',
		content:
			'View a history of all your rotation applications, pay for applications, and download registration invoices and receipts',
		backgroundColor: '#FFFFFF',
		path: require('../../assets/images/clock.png'),
		route: '/registrationapplications',
	},
];

const RegHome = () => {
	return (
		<View className='flex flex-1'>
			<FlashList data={data} estimatedItemSize={20} renderItem={({item}) => <BoxImage data={item} />} />
		</View>
	);
};

export default RegHome;
