import React from 'react';
import LicenseComponent from '../../components/profile/license';
import { useAuth } from '../../providers/auth';
import { StatusBar } from 'expo-status-bar';

const License = () => {
	const { user } = useAuth();
	return (
		<>
			<LicenseComponent user={user} />
			<StatusBar style='dark' />
		</>
	);
};

export default License;
