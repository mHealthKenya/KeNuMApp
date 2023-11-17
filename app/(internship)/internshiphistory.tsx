import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import InternshipApplicationsComponent from '../../components/internship/history/applications';
import { primaryColor } from '../../constants/Colors';
import useInternshipApplications from '../../services/internship/applications';
import globalStyles from '../../styles/global';

const InternshipHistory = () => {
	const { data, isLoading, refetch, isRefetching } =
		useInternshipApplications();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}
	return (
		<InternshipApplicationsComponent
			applications={data || []}
			refresh={refetch}
			isRefreshing={isRefetching}
		/>
	);
};

export default InternshipHistory;
