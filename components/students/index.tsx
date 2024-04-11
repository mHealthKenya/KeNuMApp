import React from 'react';
import {ScrollView, View} from 'react-native';
import globalStyles from '../../styles/global';
import CPDBoxComponent from '../cpds/cpdbox';

const StudentsComponent = () => {
	return (
		<View style={globalStyles.container}>
			<ScrollView
				style={{
					flex: 1,
				}}>
				<CPDBoxComponent
					box={{
						title: 'Exams',
						content: 'Apply for exams, view applications history, pay for exams, and view exam results',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/examalt.png'),
						route: '/examall',
					}}
				/>
				<CPDBoxComponent
					box={{
						title: 'Internships',
						content: 'Apply for internships, check in for internships, make log rotations, and transfer internships.',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/internshipalt.png'),
						route: '/internship',
					}}
				/>

				<CPDBoxComponent
					box={{
						title: 'Registration',
						content: 'Apply for registration, view registration history, and pay for registration.',
						backgroundColor: '#dcf0fa',
						path: require('../../assets/images/registration.png'),
						route: '/registrationhome',
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default StudentsComponent;
