import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import ExamApplicationsComponent from '../../components/exams/applications';
import { primaryColor } from '../../constants/Colors';
import { useAuth } from '../../providers/auth';
import useExamApplications from '../../services/exams/applications';
import globalStyles from '../../styles/global';

const ExamApplications = () => {
	const { user } = useAuth();

	const { data = [], isLoading } = useExamApplications(user?.id || '');

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<ExamApplicationsComponent applications={data} />
			<StatusBar style='light' />
		</>
	);
};

export default ExamApplications;
