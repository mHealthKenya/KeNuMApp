import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import InternshipAreasComponent from '../../components/internship/rotations/internshipareas';
import { primaryColor } from '../../constants/Colors';
import useInternshipAreas from '../../services/internship/internshipareas';
import globalStyles from '../../styles/global';

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
