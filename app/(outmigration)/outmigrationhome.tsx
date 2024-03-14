import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CPDHomeComponent from '../../components/cpds';
import OutMigrationHomeComponent from '../../components/outmigration/outmigrationhome';

const OutMigrationHome = () => {
	return (
		<>
			<OutMigrationHomeComponent />
			<StatusBar style='light' />
		</>
	);
};

export default OutMigrationHome;
