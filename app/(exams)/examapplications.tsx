import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ExamApplicationsComponent from '../../components/exams/applications';
import CenterLoad from '../../components/shared/CenterLoad';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useExamApplications from '../../services/exams/applications';

const ExamApplications = () => {
	const { data: user, isLoading: loadingUser } = useAuthenticatedUser();

	const {
		data = [],
		isLoading,
		refetch,
		isRefetching,
	} = useExamApplications(user?.IndexNo || '');

	if (isLoading || loadingUser) {
		return <CenterLoad />;
	}

	return (
		<>
			<ExamApplicationsComponent
				applications={data}
				refetch={refetch}
				isRefetching={isRefetching}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default ExamApplications;
