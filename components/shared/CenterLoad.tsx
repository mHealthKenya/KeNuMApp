import { View, Text } from 'react-native';
import React from 'react';
import globalStyles from '../../styles/global';
import { ActivityIndicator } from 'react-native-paper';
import { primaryColor } from '../../constants/Colors';

const CenterLoad = () => {
	return (
		<View style={[globalStyles.container, globalStyles.center]}>
			<ActivityIndicator size='large' color={primaryColor} />
		</View>
	);
};

export default CenterLoad;
