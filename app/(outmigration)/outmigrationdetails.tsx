import {StatusBar} from 'expo-status-bar';
import React from 'react';
import OutmigrationStepComponent from '../../components/outmigration/steps/outmigration';

const OutmigrationDetails = () => {
	return (
		<>
			<OutmigrationStepComponent />
			<StatusBar style='light' />
		</>
	);
};

export default OutmigrationDetails;
