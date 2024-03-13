import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import KnowledgeComponent from '../../components/knowledgebase/all';
import { primaryColor } from '../../constants/Colors';
import useKnowledge from '../../services/knowledgebase/all';
import globalStyles from '../../styles/global';

const AllKnowledge = () => {
	const { data = [], isLoading, refetch, isRefetching } = useKnowledge();

	if (isLoading) {
		return (
			<View style={[globalStyles.container, globalStyles.center]}>
				<ActivityIndicator size='large' color={primaryColor} />
			</View>
		);
	}

	return (
		<>
			<KnowledgeComponent
				items={data}
				refetch={refetch}
				isRefetching={isRefetching}
			/>
			<StatusBar style='light' />
		</>
	);
};

export default AllKnowledge;
