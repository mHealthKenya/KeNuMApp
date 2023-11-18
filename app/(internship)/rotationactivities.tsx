import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import RotationActivitiesComponent from '../../components/internship/history/rotationactivities';
import { primaryColor } from '../../constants/Colors';
import useRotationActivities from '../../services/internship/rotationactivities';
import globalStyles from '../../styles/global';

const RotationActivities = () => {
	const {
		data = [],
		isLoading,
		refetch,
		isRefetching,
	} = useRotationActivities();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<RotationActivitiesComponent
			rotation={data}
			refresh={refetch}
			isRefetching={isRefetching}
		/>
	);
};

export default RotationActivities;
