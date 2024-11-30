import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {primaryColor} from '../../constants/Colors';
import globalStyles from '../../styles/global';

const CenterLoad = () => {
	return (
		<View style={[globalStyles.container, globalStyles.center]}>
			<ActivityIndicator size='large' color={primaryColor} />
		</View>
	);
};

export default CenterLoad;
