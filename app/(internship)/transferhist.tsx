import { View, Text } from 'react-native';
import React from 'react';
import useTransferHist from '../../services/internship/transferhistory';
import globalStyles from '../../styles/global';
import { primaryColor } from '../../constants/Colors';
import { ActivityIndicator } from 'react-native-paper';
import TransferHistComponent from '../../components/internship/history/transfer';

const TransferHistory = () => {
	const { data = [], isLoading, refetch, isRefetching } = useTransferHist();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<TransferHistComponent
			transfers={data}
			refresh={refetch}
			isRefetching={isRefetching}
		/>
	);
};

export default TransferHistory;
