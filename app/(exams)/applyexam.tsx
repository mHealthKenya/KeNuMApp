import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import SeriesComponent from '../../components/exams/series';
import { primaryColor } from '../../constants/Colors';
import useExamSeries from '../../services/exams/series';
import globalStyles from '../../styles/global';
import useExamCenters from '../../services/exams/centers';
import AddExamComponent from '../../components/exams/add';

const ApplyExam = () => {
	const { data = [], isLoading } = useExamCenters();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<AddExamComponent centers={data} />
			<StatusBar style='light' />
		</>
	);
};

export default ApplyExam;
