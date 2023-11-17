import React from 'react';
import RegistrationComponent from '../../components/profile/registration';
import { useAuth } from '../../providers/auth';
import { StatusBar } from 'expo-status-bar';

const Registration = () => {
	const { user } = useAuth();
	return (
		<>
			<RegistrationComponent user={user} />
			<StatusBar style='dark' />
		</>
	);
};

export default Registration;
