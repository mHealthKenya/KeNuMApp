import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import CheckinHistoryComponent from '../../components/internship/history/checkins';
import { primaryColor } from '../../constants/Colors';
import useCheckins from '../../services/internship/checkins';
import globalStyles from '../../styles/global';
import useCounties from '../../services/general/counties';
import CountiesComponent from '../../components/licence/counties';
import { StatusBar } from 'expo-status-bar';

const Counties = () => {
	const { data = [], isLoading } = useCounties();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<CountiesComponent counties={data} />
			<StatusBar style='light' />
		</>
	);
};

export default Counties;
