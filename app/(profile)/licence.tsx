import React from 'react';
import LicenseComponent from '../../components/profile/license';
import { useAuth } from '../../providers/auth';
import { StatusBar } from 'expo-status-bar';
import useAuthenticatedUser from '../../services/auth/authenticated';

const License = () => {
	const { user } = useAuth();
	const { data } = useAuthenticatedUser();
	return (
		<>
			<LicenseComponent user={data} />
			<StatusBar style='dark' />
		</>
	);
};

export default License;
