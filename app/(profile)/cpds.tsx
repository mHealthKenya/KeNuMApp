import React from 'react';
import CPDsComponent from '../../components/profile/cpds';
import { useAuth } from '../../providers/auth';
import { StatusBar } from 'expo-status-bar';

const CPDs = () => {
	const { user } = useAuth();
	return (
		<>
			<CPDsComponent user={user} />
			<StatusBar style='dark' />
		</>
	);
};

export default CPDs;
