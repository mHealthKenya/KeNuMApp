import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CPDHomeComponent from '../../components/cpds';

const CPDHome = () => {
	return (
		<>
			<CPDHomeComponent />
			<StatusBar style='light' />
		</>
	);
};

export default CPDHome;
