import { useRouter } from 'expo-router';
import React, { FC, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { County } from '../../models/counties';
import { useSearch } from '../../providers/search';
import { useWorkStationFetched } from '../../providers/workstations';
import globalStyles from '../../styles/global';
import EmptyList from '../shared/EmptyList';
import ContentBox from './contentbox';

const CountiesComponent: FC<{
	counties: County[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({ counties, refetch, isRefetching }) => {
	const { handleSearch, search, clearSearch } = useSearch();
	const { handleCounty } = useWorkStationFetched();
	const router = useRouter();

	const handlePress = (item: County) => {
		handleCounty({
			title: item.County,
			id: item.id,
		});

		clearSearch();

		router.push('/workstations');
	};

	const filtered = useMemo(
		() =>
			counties.filter((item) =>
				item.County.toLowerCase().includes(search.toLowerCase())
			),
		[counties, search]
	);

	return (
		<View style={globalStyles.container}>
			<Searchbar
				placeholder='Search county'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>
			<FlatList
				data={filtered}
				renderItem={({ item }) => (
					<ContentBox
						box={{
							title: item.County,
							id: item.id,
						}}
						action={() => handlePress(item)}
					/>
				)}
				onRefresh={refetch}
				refreshing={isRefetching}
				keyExtractor={(_, index) => String(index)}
				ListEmptyComponent={
					<EmptyList message='Could load counties. Please check your internet and retry' />
				}
			/>
		</View>
	);
};

export default CountiesComponent;

const styles = StyleSheet.create({
	searchBar: {
		backgroundColor: '#dbe6f5',
		margin: 5,
		padding: 2,
		borderRadius: 10,
	},
});
