import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import LicenceApplicationsComponent from '../../components/licence/applications';
import { primaryColor } from '../../constants/Colors';
import { useAuth } from '../../providers/auth';
import useLicenceApplications from '../../services/licence/applications';
import globalStyles from '../../styles/global';
import useOutMigrationHistorys from '../../services/outmigration/outmigrationapplicationhistory';
import OutMigrationHistoryComponent from '../../components/outmigration/outmigrationhistory';

const OutMigrationHistory = () => {
	const { user } = useAuth();
	const {
		data = [],
		isLoading,
		isRefetching,
		refetch,
	} = useOutMigrationHistorys(user?.id || '');

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<OutMigrationHistoryComponent
				applications={data}
				refetch={refetch}
				isRefreshing={isRefetching}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default OutMigrationHistory;
