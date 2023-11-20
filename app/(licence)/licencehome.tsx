import { StatusBar } from 'expo-status-bar';
import React from 'react';
import LicenceHomeComponent from '../../components/licence';

const LicenceHome = () => {
	return (
		<>
			<LicenceHomeComponent />
			<StatusBar style='light' />
		</>
	);
};

export default LicenceHome;
