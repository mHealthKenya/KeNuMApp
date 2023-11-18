import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import CheckinHistoryComponent from '../../components/internship/history/checkins';
import { primaryColor } from '../../constants/Colors';
import useCheckins from '../../services/internship/checkins';
import globalStyles from '../../styles/global';

const Checkins = () => {
	const { data = [], isLoading, refetch, isRefetching } = useCheckins();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<CheckinHistoryComponent
			checkins={data}
			refresh={refetch}
			isRefetching={isRefetching}
		/>
	);
};

export default Checkins;
