import React, { FC, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { KnowledgeBase } from '../../models/knowledgebase';
import { useSearch } from '../../providers/search';
import globalStyles from '../../styles/global';
import KnowledgeBox from './knowbox';

const KnowledgeComponent: FC<{
	items: KnowledgeBase[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({ items, refetch, isRefetching }) => {
	const { search, handleSearch } = useSearch();

	const filtered = useMemo(
		() =>
			items.filter(
				(item) =>
					item.title.toLowerCase().includes(search.toLowerCase()) ||
					item.subtitle.toLowerCase().includes(search.toLowerCase())
			),
		[search, items]
	);
	return (
		<View style={globalStyles.container}>
			<Searchbar
				placeholder='Start typing...'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>
			<FlatList
				data={filtered}
				renderItem={({ item }) => <KnowledgeBox box={item} />}
				keyExtractor={(_, index) => String(index)}
				onRefresh={refetch}
				refreshing={isRefetching}
			/>
		</View>
	);
};

export default KnowledgeComponent;

const styles = StyleSheet.create({
	searchBar: {
		backgroundColor: '#dbe6f5',
		margin: 5,
		padding: 2,
		borderRadius: 10,
	},
});
