import { View, Text } from 'react-native';
import React from 'react';
import CPDSelfReportingComponent from '../../components/cpds/selfreporting';
import { StatusBar } from 'expo-status-bar';

const SelfReporting = () => {
	return (
		<>
			<CPDSelfReportingComponent />
			<StatusBar style='light' />
		</>
	);
};

export default SelfReporting;
