import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import ExamApplicationsComponent from '../../components/exams/applications';
import { primaryColor } from '../../constants/Colors';
import { useAuth } from '../../providers/auth';
import useExamApplications from '../../services/exams/applications';
import globalStyles from '../../styles/global';
import useExamResults from '../../services/exams/results';
import ExamResultsComponent from '../../components/exams/results';

const ExamResults = () => {
	const {
		data = [],
		isLoading,
		isRefetching,
		refetch,
	} = useExamResults('105501');

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
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
