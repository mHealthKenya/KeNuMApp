import React from 'react';
import BioData from '../../components/profile/biodata';
import { useAuth } from '../../providers/auth';
import { StatusBar } from 'expo-status-bar';
import useAuthenticatedUser from '../../services/auth/authenticated';

const General = () => {
	const { user } = useAuth();
	const { data } = useAuthenticatedUser();
	return (
		<>
			<BioData user={data} />
			<StatusBar style='dark' />
		</>
	);
};

export default General;
