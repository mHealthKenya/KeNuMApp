import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ExamResultsComponent from '../../components/exams/results';
import CenterLoad from '../../components/shared/CenterLoad';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useExamResults from '../../services/exams/results';

const ExamResults = () => {
	const { data: user, isLoading: loadingUser } = useAuthenticatedUser();

	const {
		data = [],
		isLoading,
		isRefetching,
		refetch,
	} = useExamResults(user?.IndexNo || '');

	// use 105501 for demo

	if (isLoading || loadingUser) {
		return <CenterLoad />;
	}

	return (
		<>
			<ExamResultsComponent
				results={data}
				isRefetching={isRefetching}
				refresh={refetch}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default ExamResults;
