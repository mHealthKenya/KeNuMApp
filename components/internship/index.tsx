import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import globalStyles from '../../styles/global';
import ApplyBox from './box/apply';
import CheckInBox from './box/checkin';
import HistoryBox from './box/history';
import RotationsBox from './box/rotations';
import TransfersBox from './box/transfers';
import { InternBox } from './internshipbox';

const internships: InternBox[] = [
	{
		title: 'apply for internship',
		content: 'Embark on a journey towards professional growth!',
		backgroundColor: '#dcf0fa',
		path: require('../../assets/images/kenurse.png'),
		route: '/internshipapply',
	},

	{
		title: 'internship checkin',
		content: 'Verify that you reported to your internship center',
		backgroundColor: '#dcf0fa',
		path: require('../../assets/images/checkin.png'),
		route: '/internshipapply',
	},

	{
		title: 'log rotations',
		content: 'Log all activities throughout your internship',
		backgroundColor: '#dcf0fa',
		path: require('../../assets/images/rotations.png'),
		route: '/internshipapply',
	},

	{
		title: 'Internship transfer',
		content: 'Apply for a change of internship center',
		backgroundColor: '#dcf0fa',
		path: require('../../assets/images/transfer.png'),
		route: '/internshipapply',
	},

	{
		title: 'Internship History',
		content:
			'View histories of your internship applications, transfers and check ins',
		backgroundColor: '#dcf0fa',
		path: require('../../assets/images/clock.png'),
		route: '/internshipapply',
	},
];

const InternshipComponent = () => {
	return (
		<View style={[globalStyles.container]}>
			<ScrollView
				contentContainerStyle={[globalStyles.column, styles.fullSize]}>
				<ApplyBox />
				<CheckInBox />
				<RotationsBox />
				<TransfersBox />
				<HistoryBox />
			</ScrollView>
		</View>
	);
};

export default InternshipComponent;

const styles = StyleSheet.create({
	box: {
		margin: 10,
		padding: 20,
		borderRadius: 10,
	},

	fullSize: {
		justifyContent: 'space-evenly',
	},
});
