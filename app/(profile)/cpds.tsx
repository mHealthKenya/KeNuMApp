import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import CPDsComponent from '../../components/profile/cpds';
import { primaryColor } from '../../constants/Colors';
import useAuthenticatedUser from '../../services/auth/authenticated';
import globalStyles from '../../styles/global';

const CPDs = () => {
	const { data, isLoading } = useAuthenticatedUser();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<CPDsComponent user={data} />
			<StatusBar style='dark' />
		</>
	);
};

export default CPDs;
