import {StatusBar} from 'expo-status-bar';
import React from 'react';
import SeriesComponent from '../../components/exams/series';
import CenterLoad from '../../components/shared/CenterLoad';
import {useAuth} from '../../providers/auth';
import useExamSeries from '../../services/exams/series';

const Series = () => {
	const {user} = useAuth();

	// const {data = [], isLoading} = useExamSeries('105501'); // We are using this for demo purposes. Please use the code below in production

	const {data = [], isLoading} = useExamSeries(user?.IndexNo || '');

	if (isLoading) {
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
