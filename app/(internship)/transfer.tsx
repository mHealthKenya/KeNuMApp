import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import RequestTransferComponent from '../../components/internship/transfers/request';
import { primaryColor } from '../../constants/Colors';
import useInternshipCenters from '../../services/internship/centers';
import useTransferReasons from '../../services/internship/transferreasons';
import globalStyles from '../../styles/global';

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
