import React from 'react';
import RegistrationComponent from '../../components/profile/registration';
import { useAuth } from '../../providers/auth';

const Registration = () => {
	const { user } = useAuth();
	return <RegistrationComponent user={user} />;
};

export default Registration;
