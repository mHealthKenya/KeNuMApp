import { StatusBar } from 'expo-status-bar';
import React from 'react';
import RegistrationApplicationComponent from '../../components/registration/apply';

const RegistrationApplication = () => {
	return (
		<>
			<RegistrationApplicationComponent />
			<StatusBar style='light' />
		</>
	);
};

export default RegistrationApplication;
