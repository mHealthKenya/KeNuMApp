import {StatusBar} from 'expo-status-bar';
import React from 'react';
import PersonalDetailsComponent from '../../components/outmigration/steps/personal';

const PersonalDetails = () => {
	return (
		<>
			<PersonalDetailsComponent />
			<StatusBar style='light' />
		</>
	);
};

export default PersonalDetails;
