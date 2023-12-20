import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import RegistrationComponent from '../../components/profile/registration';
import { primaryColor } from '../../constants/Colors';
import useAuthenticatedUser from '../../services/auth/authenticated';
import globalStyles from '../../styles/global';

const Registration = () => {
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
			<RegistrationComponent user={data} />
			<StatusBar style='dark' />
		</>
	);
};

export default Registration;
