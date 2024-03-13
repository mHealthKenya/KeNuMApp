import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { primaryColor } from '../../constants/Colors';
import useRotationCompetencies from '../../services/internship/rotationcompetencies';
import globalStyles from '../../styles/global';

const RotationCompetencies = () => {
	const {data: areas = [], isPending} = useRotationCompetencies(() => {});

	if (isPending) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}
	return <></>
};

export default RotationCompetencies;
