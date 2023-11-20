import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import SelfReportingCategoriesComponent from '../../components/cpds/selfreportingcategories';
import { primaryColor } from '../../constants/Colors';
import useCPDCategories from '../../services/cpds/categories';
import globalStyles from '../../styles/global';

const CPDCategories = () => {
	const { data = [], isLoading, refetch, isRefetching } = useCPDCategories();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<SelfReportingCategoriesComponent
				categories={data}
				refresh={refetch}
				isRefreshing={isRefetching}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default CPDCategories;
