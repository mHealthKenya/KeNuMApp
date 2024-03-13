import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ExamApplicationsComponent from '../../components/exams/applications';
import CenterLoad from '../../components/shared/CenterLoad';
import { useAuth } from '../../providers/auth';
import useExamApplications from '../../services/exams/applications';

const ExamApplications = () => {
	const {user, isLoading: loadingUser} = useAuth();

	const {data = [], isLoading, refetch, isRefetching} = useExamApplications(user?.id || '');

	if (isLoading || loadingUser) {
		return <CenterLoad />;
	}

	return (
		<>
			<ExamApplicationsComponent applications={data} refetch={refetch} isRefetching={isRefetching} />
			<StatusBar style='light' />
		</>
	);
};

export default ExamApplications;
