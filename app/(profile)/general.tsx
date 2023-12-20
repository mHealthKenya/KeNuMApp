import { StatusBar } from 'expo-status-bar';
import React from 'react';
import BioData from '../../components/profile/biodata';
import useAuthenticatedUser from '../../services/auth/authenticated';
import globalStyles from '../../styles/global';
import { primaryColor } from '../../constants/Colors';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

const General = () => {
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
			<BioData user={data} />
			<StatusBar style='dark' />
		</>
	);
};

export default General;
