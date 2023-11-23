import React from 'react';
import RegistrationComponent from '../../components/profile/registration';
import { useAuth } from '../../providers/auth';
import { StatusBar } from 'expo-status-bar';
import useAuthenticatedUser from '../../services/auth/authenticated';

const Registration = () => {
	const { user } = useAuth();
	const { data } = useAuthenticatedUser();
	return (
		<>
			<RegistrationComponent user={data} />
			<StatusBar style='dark' />
		</>
	);
};

export default Registration;
