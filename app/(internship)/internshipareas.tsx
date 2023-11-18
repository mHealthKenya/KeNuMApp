import { View, Text } from 'react-native';
import React from 'react';
import useInternshipAreas from '../../services/internship/internshipareas';
import globalStyles from '../../styles/global';
import { ActivityIndicator } from 'react-native-paper';
import { primaryColor } from '../../constants/Colors';
import InternshipAreasComponent from '../../components/internship/rotations/internshipareas';

const InternshipAreas = () => {
	const { data: areas = [], isLoading } = useInternshipAreas();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}
	return <InternshipAreasComponent areas={areas} />;
};

export default InternshipAreas;
