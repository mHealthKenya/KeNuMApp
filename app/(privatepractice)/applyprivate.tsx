import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import ApplyPrivateComponent from '../../components/privatepractice/apply';
import { primaryColor } from '../../constants/Colors';
import useCounties from '../../services/general/counties';
import globalStyles from '../../styles/global';

const PrivateApply = () => {
	const { data: counties = [], isLoading } = useCounties();
	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}
	return (
		<>
			<ApplyPrivateComponent counties={counties} />
			<StatusBar style='light' />
		</>
	);
};

export default PrivateApply;
