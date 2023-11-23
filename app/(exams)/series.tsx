import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import SeriesComponent from '../../components/exams/series';
import { primaryColor } from '../../constants/Colors';
import useExamSeries from '../../services/exams/series';
import globalStyles from '../../styles/global';
import useAuthenticatedUser from '../../services/auth/authenticated';

const Series = () => {
	const { data: user, isLoading: loadingUser } = useAuthenticatedUser();

	const { data = [], isLoading } = useExamSeries('105501'); // We are using this for demo purposes. Please use the code below in production

	// const { data = [], isLoading } = useExamSeries(user?.IndexNo || '');

	if (isLoading || loadingUser) {
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
