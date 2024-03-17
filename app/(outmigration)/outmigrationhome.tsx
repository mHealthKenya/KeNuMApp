import {StatusBar} from 'expo-status-bar';
import React from 'react';
import OutmigrationHomeComponent from '../../components/outmigration';

const OutMigrationHome = () => {
	return (
		<>
			<OutmigrationHomeComponent />
			<StatusBar style='light' />
		</>
	);
};

export default OutMigrationHome;
