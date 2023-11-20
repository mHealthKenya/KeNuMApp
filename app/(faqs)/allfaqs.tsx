import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import AllFAQsComponent from '../../components/faqs/all';
import { primaryColor } from '../../constants/Colors';
import useAllFAQS from '../../services/faqs/all';
import globalStyles from '../../styles/global';

const AllFAQS = () => {
	const { data = [], isLoading, refetch, isRefetching } = useAllFAQS();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<AllFAQsComponent
				faqs={data}
				refetch={refetch}
				isRefetching={isRefetching}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default AllFAQS;
