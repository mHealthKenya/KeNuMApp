import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import WorkStationsComponent from '../../components/licence/workstations';
import { primaryColor } from '../../constants/Colors';
import { useWorkStationFetched } from '../../providers/workstations';
import useWorkStations from '../../services/general/workstations';
import globalStyles from '../../styles/global';

const WorkStations = () => {
	const { county } = useWorkStationFetched();
	const {
		data = [],
		isLoading,
		isRefetching,
		refetch,
	} = useWorkStations(county?.id || '');

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<WorkStationsComponent
				workstations={data}
				refetch={refetch}
				isRefetching={isRefetching}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default WorkStations;
