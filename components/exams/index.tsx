import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {View} from 'react-native';
import BoxImage, {InternBox} from '../shared/BoxImage';

const history: InternBox[] = [
	{
		title: 'Exam Application',
		content: 'Select two centers and send in your application!',
		path: require('../../assets/images/nursesmall.png'),
		route: '/series',
		backgroundColor: '#FFFFFF',
	},

	{
		title: 'Exam Results',
		content: 'See a history of all your exam applications.',
		path: require('../../assets/images/clock.png'),
		route: '/examresults',
		backgroundColor: '#FFFFFF',
	},

	{
		title: 'Exam Applications History',
		content: 'See how you performed in your previous exams',
		path: require('../../assets/images/rotations.png'),
		route: '/examapplications',
		backgroundColor: '#FFFFFF',
	},
];

const ExamAllComponent = () => {
	return (
		<View className='flex flex-1'>
			<FlashList estimatedItemSize={200} renderItem={({item}) => <BoxImage data={item} />} data={history} />
		</View>
	);
};

export default ExamAllComponent;
