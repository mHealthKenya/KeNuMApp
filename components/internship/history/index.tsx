import React from 'react';
import { View } from 'react-native';
import globalStyles from '../../../styles/global';
import InternshipBox, { InternBox } from '../internshipbox';

const history: InternBox[] = [
	{
		title: 'Internship Applications',
		content:
			'View a history of all internship applications, make payments, download invoices and receipts.',
		path: require('../../../assets/images/nursesmall.png'),
		route: '/internshiphistory',
		backgroundColor: '#dcf0fa',
	},

	{
		title: 'Internship Check Ins',
		content: 'See a history of all you internship check ins.',
		path: require('../../../assets/images/clock.png'),
		route: '/checkins',
		backgroundColor: '#dcf0fa',
	},

	{
		title: 'Internship Rotations',
		content:
			'View a history of all your internship rotations and request for competency verification',
		path: require('../../../assets/images/rotationssmall.png'),
		route: '/rotationactivities',
		backgroundColor: '#dcf0fa',
	},

	{
		title: 'Internship Transfers',
		content:
			'View a history of all internship transfers applications and their approval status.',
		path: require('../../../assets/images/transfersmall.png'),
		route: '/transferhist',
		backgroundColor: '#dcf0fa',
	},
];

const AllHistoryComponent = () => {
	return (
		<View style={globalStyles.container}>
			<View style={[{ flex: 1 }]}>
				{history.map((box) => (
					<InternshipBox box={box} key={box.title} />
				))}
			</View>
		</View>
	);
};

export default AllHistoryComponent;
