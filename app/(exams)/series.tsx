import {StatusBar} from 'expo-status-bar';
import React from 'react';
import SeriesComponent from '../../components/exams/series';
import CenterLoad from '../../components/shared/CenterLoad';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useExamSeries from '../../services/exams/series';

const Series = () => {
	const {data: user, isLoading: loadingUser} = useAuthenticatedUser();

	// const {data = [], isLoading} = useExamSeries('105501'); // We are using this for demo purposes. Please use the code below in producti
	const {data = [], isLoading} = useExamSeries(user?.id || '');

	console.log(data);

	if (isLoading || loadingUser) {
		return <CenterLoad />;
	}

	return (
		<>
			<SeriesComponent serie={data} />
			<StatusBar style='light' />
		</>
	);
};

export default Series;
