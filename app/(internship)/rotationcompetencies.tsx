import { View, Text } from 'react-native';
import React from 'react';
import useInternshipAreas from '../../services/internship/internshipareas';
import globalStyles from '../../styles/global';
import { ActivityIndicator } from 'react-native-paper';
import { primaryColor } from '../../constants/Colors';
import InternshipAreasComponent from '../../components/internship/rotations/internshipareas';
import useRotationCompetencies from '../../services/internship/rotationcompetencies';

const RotationCompetencies = () => {
	const { data: areas = [], isLoading } = useRotationCompetencies();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}
	return <InternshipAreasComponent areas={areas} />;
};

export default RotationCompetencies;
