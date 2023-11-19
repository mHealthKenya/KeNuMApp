import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import RegistrationApplicationsComponent from '../../components/registration/applications';
import { primaryColor } from '../../constants/Colors';
import useRegistrationApplications from '../../services/registration/applications';
import globalStyles from '../../styles/global';

const RegistrationApplications = () => {
	const { data = [], isLoading } = useRegistrationApplications();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<RegistrationApplicationsComponent applications={data} />
			<StatusBar style='light' />
		</>
	);
};

export default RegistrationApplications;
