import React from 'react';
import CPDsComponent from '../../components/profile/cpds';
import { useAuth } from '../../providers/auth';
import { StatusBar } from 'expo-status-bar';
import useAuthenticatedUser from '../../services/auth/authenticated';

const CPDs = () => {
	const { user } = useAuth();

	const { data } = useAuthenticatedUser();
	return (
		<>
			<CPDsComponent user={data} />
			<StatusBar style='dark' />
		</>
	);
};

export default CPDs;
