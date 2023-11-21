import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import CountiesComponent from '../../components/licence/counties';
import { primaryColor } from '../../constants/Colors';
import useCounties from '../../services/general/counties';
import globalStyles from '../../styles/global';

const Counties = () => {
	const { data = [], isLoading, isRefetching, refetch } = useCounties();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<CountiesComponent
				counties={data}
				isRefetching={isRefetching}
				refetch={refetch}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default Counties;
