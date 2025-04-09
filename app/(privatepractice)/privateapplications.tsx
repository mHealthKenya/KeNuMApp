import {StatusBar} from 'expo-status-bar';
import React from 'react';
import PrivatePracticeApplications from '../../components/privatepractice/applications';
import CenterLoad from '../../components/shared/CenterLoad';
import useAuthenticatedUser from '../../services/auth/authenticated';
import usePrivateApplications from '../../services/privatepractice/applications';

const PrivateApplications = () => {
	const {data: user, isLoading: loadingUser} = useAuthenticatedUser();
	const {data = [], isLoading, refetch, isRefetching} = usePrivateApplications(user?.id);

	if (isLoading || loadingUser) {
		return <CenterLoad />;
	}

	return (
		<>
			<PrivatePracticeApplications applications={data} refetch={refetch} isRefetching={isRefetching} />
			<StatusBar style='light' />
		</>
	);
};

export default PrivateApplications;
