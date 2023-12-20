import { StatusBar } from 'expo-status-bar';
import React from 'react';
import LicenseComponent from '../../components/profile/license';
import useAuthenticatedUser from '../../services/auth/authenticated';
import { View } from 'react-native';
import globalStyles from '../../styles/global';
import { primaryColor } from '../../constants/Colors';
import { ActivityIndicator } from 'react-native-paper';

const License = () => {
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
			<LicenseComponent user={data} />
			<StatusBar style='dark' />
		</>
	);
};

export default License;
