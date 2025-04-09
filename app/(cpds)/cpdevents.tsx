import {StatusBar} from 'expo-status-bar';
import React from 'react';
import CPDEventsComponent from '../../components/cpds/events';
import CenterLoad from '../../components/shared/CenterLoad';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useCPDEvents from '../../services/cpds/events';

const CPDEvents = () => {
	const {data: user, isLoading: loadingUser} = useAuthenticatedUser();
	const {isLoading, data: events = [], refetch, isRefetching} = useCPDEvents(user?.id);

	if (isLoading || loadingUser) {
		return <CenterLoad />;
	}

	return (
		<>
			<CPDEventsComponent events={events} refresh={refetch} isRefetching={isRefetching} />
			<StatusBar style='light' />
		</>
	);
};

export default CPDEvents;
