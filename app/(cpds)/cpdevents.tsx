import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CPDEventsComponent from '../../components/cpds/events';
import CenterLoad from '../../components/shared/CenterLoad';
import { useAuth } from '../../providers/auth';
import useCPDEvents from '../../services/cpds/events';

const CPDEvents = () => {
	const { user } = useAuth();
	const {
		isLoading,
		data: events = [],
		refetch,
		isRefetching,
	} = useCPDEvents('4068');

	if (isLoading) {
		return <CenterLoad />;
	}

	return (
		<>
			<CPDEventsComponent
				events={events}
				refresh={refetch}
				isRefetching={isRefetching}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default CPDEvents;
