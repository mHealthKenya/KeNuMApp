import { StatusBar } from 'expo-status-bar';
import React from 'react';
import BioData from '../../components/profile/biodata';
import useAuthenticatedUser from '../../services/auth/authenticated';

const General = () => {
	const { data } = useAuthenticatedUser();
	return (
		<>
			<BioData user={data || {}} />
			<StatusBar style='dark' />
		</>
	);
};

export default General;
