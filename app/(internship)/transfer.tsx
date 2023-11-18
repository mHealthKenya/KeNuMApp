import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import useTransferReasons from '../../services/internship/transferreasons';
import useInternshipCenters from '../../services/internship/centers';
import globalStyles from '../../styles/global';
import { primaryColor } from '../../constants/Colors';
import { ActivityIndicator } from 'react-native-paper';
import RequestTransferComponent from '../../components/internship/transfers/request';

const Transfer = () => {
	const { data: reasons = [], isLoading: reasonsLoading } =
		useTransferReasons();
	const {
		data: centers = [],
		mutate,
		isPending,
		isError,
	} = useInternshipCenters();

	useEffect(() => {
		mutate();
	}, []);

	if (isPending || reasonsLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<RequestTransferComponent
			centers={centers?.internship_centers}
			reasons={reasons}
		/>
	);
};

export default Transfer;
