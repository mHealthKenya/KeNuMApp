import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import LicenceApplicationsComponent from '../../components/licence/applications';
import { primaryColor } from '../../constants/Colors';
import { useAuth } from '../../providers/auth';
import useLicenceApplications from '../../services/licence/applications';
import globalStyles from '../../styles/global';

const LicenceApplications = () => {
	const { user } = useAuth();
	const { data = [], isLoading } = useLicenceApplications(user?.id || '');

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<LicenceApplicationsComponent applications={data} />
			<StatusBar style='light' />
		</>
	);
};

export default LicenceApplications;
