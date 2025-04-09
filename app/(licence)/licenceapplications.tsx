import {StatusBar} from 'expo-status-bar';
import React from 'react';
import LicenceApplicationsComponent from '../../components/licence/applications';
import CenterLoad from '../../components/shared/CenterLoad';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useLicenceApplications from '../../services/licence/applications';

const LicenceApplications = () => {
	const {data: user, isLoading: loadingUser} = useAuthenticatedUser();
	const {data = [], isLoading, isRefetching, refetch} = useLicenceApplications(user?.id || '');

	if (isLoading || loadingUser) {
		return <CenterLoad />;
	}

	return (
		<>
			<LicenceApplicationsComponent applications={data} refetch={refetch} isRefetching={isRefetching} />
			<StatusBar style='light' />
		</>
	);
};

export default LicenceApplications;
