import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AddExamComponent from '../../components/exams/add';
import CenterLoad from '../../components/shared/CenterLoad';
import useAuthenticatedUser from '../../services/auth/authenticated';
import useExamCenters from '../../services/exams/centers';

const ApplyExam = () => {
	const { data = [], isLoading } = useExamCenters();
	const { data: user, isLoading: loadingUser } = useAuthenticatedUser();

	if (isLoading || loadingUser) {
		return <CenterLoad />;
	}

	return (
		<>
			<AddExamComponent centers={data} user={user!} />
			<StatusBar style='light' />
		</>
	);
};

export default ApplyExam;
