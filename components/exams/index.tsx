import React from 'react';
import {ScrollView, View} from 'react-native';
import globalStyles from '../../styles/global';
import InternshipBox from '../internship/internshipbox';
import {InternBox} from './series';

const history: InternBox[] = [
	{
		title: 'Exam Application',
		content: 'Select two centers and send in your application!',
		path: require('../../assets/images/nursesmall.png'),
		route: '/series',
		backgroundColor: '#dcf0fa',
	},

	{
		title: 'Exam Results',
		content: 'See a history of all your exam applications.',
		path: require('../../assets/images/clock.png'),
		route: '/examresults',
		backgroundColor: '#dcf0fa',
	},

	{
		title: 'Exam Applications History',
		content: 'See how you performed in your previous exams',
		path: require('../../assets/images/rotations.png'),
		route: '/examapplications',
		backgroundColor: '#dcf0fa',
	},
];

const ExamAllComponent = () => {
	return (
		<View style={globalStyles.container}>
			<ScrollView style={[{flex: 0.7}]}>
				{history.map((box) => (
					<InternshipBox box={box} key={box.title} />
				))}
			</ScrollView>
		</View>
	);
};

export default ExamAllComponent;
