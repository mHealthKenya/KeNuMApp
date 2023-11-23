import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CPDSelfReportingComponent from '../../components/cpds/selfreporting';
import CenterLoad from '../../components/shared/CenterLoad';
import useAuthenticatedUser from '../../services/auth/authenticated';

const SelfReporting = () => {
	const { data: user, isLoading: loadingUser } = useAuthenticatedUser();

	if (loadingUser) {
		return <CenterLoad />;
	}

	return (
		<>
			<CPDSelfReportingComponent user={user!} />
			<StatusBar style='light' />
		</>
	);
};

export default SelfReporting;
