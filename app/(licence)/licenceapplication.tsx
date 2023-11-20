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
import useWorkStations from '../../services/general/workstations';
import { useWorkStationFetched } from '../../providers/workstations';
import WorkStationsComponent from '../../components/licence/workstations';
import useEmployers from '../../services/licence/employers';
import LicenceApplicationComponent from '../../components/licence/apply';

const LicenceApplication = () => {
	const { county, workStation } = useWorkStationFetched();
	const { data = [], isLoading } = useEmployers();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<LicenceApplicationComponent
				employers={data}
				county={county!}
				workstation={workStation!}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default LicenceApplication;
