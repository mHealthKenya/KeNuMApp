import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CPDActivitiesComponent from '../../components/cpds/activities';
import CenterLoad from '../../components/shared/CenterLoad';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useCPDActivities from '../../services/cpds/activities';

const CPDActivities = () => {
	const { data: user, isLoading: loadingUser } = useAuthenticatedUser();

	const {
		data = [],
		isLoading,
		refetch,
		isRefetching,
	} = useCPDActivities(user?.id || '');

	if (isLoading || loadingUser) {
		return <CenterLoad />;
	}

	return (
		<>
			<CPDActivitiesComponent
				activities={data}
				refresh={refetch}
				isRefetching={isRefetching}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default CPDActivities;
