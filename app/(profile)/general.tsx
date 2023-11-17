import React from 'react';
import BioData from '../../components/profile/biodata';
import { useAuth } from '../../providers/auth';
import { StatusBar } from 'expo-status-bar';

const General = () => {
	const { user } = useAuth();
	return (
		<>
			<BioData user={user} />
			<StatusBar style='dark' />
		</>
	);
};

export default General;
