import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import SeriesComponent from '../../components/exams/series';
import { primaryColor } from '../../constants/Colors';
import useExamSeries from '../../services/exams/series';
import globalStyles from '../../styles/global';

const Series = () => {
	const { data = [], isLoading } = useExamSeries();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<SeriesComponent serie={data} />
			<StatusBar style='light' />
		</>
	);
};

export default Series;
