import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { KnowledgeBase } from '../../models/knowledgebase';
import globalStyles from '../../styles/global';
import KnowledgeBox from './knowbox';

const KnowledgeComponent: FC<{
	items: KnowledgeBase[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({ items, refetch, isRefetching }) => {
	return (
		<View style={globalStyles.container}>
			<FlatList
				data={items}
				renderItem={({ item }) => <KnowledgeBox box={item} />}
				keyExtractor={(_, index) => String(index)}
				onRefresh={refetch}
				refreshing={isRefetching}
			/>
		</View>
	);
};

export default KnowledgeComponent;

const styles = StyleSheet.create({});
