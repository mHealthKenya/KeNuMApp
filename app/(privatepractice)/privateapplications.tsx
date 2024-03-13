import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import PrivatePracticeApplications from '../../components/privatepractice/applications';
import { primaryColor } from '../../constants/Colors';
import usePrivateApplications from '../../services/privatepractice/applications';
import globalStyles from '../../styles/global';
import useAuthenticatedUser from '../../services/auth/authenticated';
import { useAuth } from '../../providers/auth';

const PrivateApplications = () => {
	
	const { user } = useAuth()
	const {
		data = [],
		isLoading,
		refetch,
		isRefetching,
	} = usePrivateApplications(user?.id);

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<PrivatePracticeApplications
				applications={data}
				refetch={refetch}
				isRefetching={isRefetching}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default PrivateApplications;
