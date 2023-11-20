import { StatusBar } from 'expo-status-bar';
import React from 'react';
import RegHome from '../../components/registration';

const RegistrationHome = () => {
	return (
		<>
			<RegHome />
			<StatusBar style='light' />
		</>
	);
};

export default RegistrationHome;
