import {StatusBar} from 'expo-status-bar';
import React from 'react';
import LicenceHomeComponent from '../../components/licence';
import {useAuth} from '../../providers/auth';
import useLicenceApplications from '../../services/licence/applications';
import {View} from '../../components/Themed';
import {ActivityIndicator} from 'react-native-paper';
import {primaryColor} from '../../constants/Colors';

const LicenceHome = () => {
	const {user} = useAuth();
	const {data = [], isLoading} = useLicenceApplications(user?.id || '');

	if (isLoading) {
		return (
			<View className='flex flex-1 items-center justify-center'>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}
	return (
		<>
			<LicenceHomeComponent applications={data} />
			<StatusBar style='light' />
		</>
	);
};

export default LicenceHome;
