import {StatusBar} from 'expo-status-bar';
import React from 'react';
import LicenceHomeComponent from '../../components/licence';
import CenterLoad from '../../components/shared/CenterLoad';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useLicenceApplications from '../../services/licence/applications';

const LicenceHome = () => {
	const {data: user, isLoading: loadingUser} = useAuthenticatedUser();
	const {data = [], isLoading} = useLicenceApplications(user?.id || '');

	if (isLoading || loadingUser) {
		return <CenterLoad />;
	}
	return (
		<>
			<LicenceHomeComponent applications={data} />
			<StatusBar style='light' />
		</>
	);
};

export default LicenceHome;
