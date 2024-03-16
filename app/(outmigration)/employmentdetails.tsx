import { StatusBar } from 'expo-status-bar';
import React from 'react';
import EmploymentDetailsComponent from '../../components/outmigration/steps/employment';

const EmploymentDetails = () => {
	return (
		<>
			<EmploymentDetailsComponent />
			<StatusBar style='light' />
		</>
	);
};

export default EmploymentDetails;
