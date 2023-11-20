import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import CPDActivitiesComponent from '../../components/cpds/activities';
import { primaryColor } from '../../constants/Colors';
import useCPDActivities from '../../services/cpds/activities';
import globalStyles from '../../styles/global';
import { useAuth } from '../../providers/auth';

const CPDActivities = () => {
	const { user } = useAuth();
	const {
		data = [],
		isLoading,
		refetch,
		isRefetching,
	} = useCPDActivities(user?.id || '');

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<CPDActivitiesComponent
				activities={data}
				refresh={refetch}
				isRefetching={isRefetching}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default CPDActivities;
