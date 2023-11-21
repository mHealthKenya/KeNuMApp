import { useRouter } from 'expo-router';
import React, { FC, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { WorkStation } from '../../models/workstations';
import { useSearch } from '../../providers/search';
import { useWorkStationFetched } from '../../providers/workstations';
import globalStyles from '../../styles/global';
import EmptyList from '../shared/EmptyList';
import ContentBox from './contentbox';

const WorkStationsComponent: FC<{
	workstations: WorkStation[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({ workstations, isRefetching, refetch }) => {
	const { handleSearch, search } = useSearch();
	const { handleWorkStation } = useWorkStationFetched();

	const filtered = useMemo(
		() =>
			workstations.filter((item) =>
				item.workstation.toLowerCase().includes(search.toLowerCase())
			),
		[workstations, search]
	);

	const router = useRouter();

	const handlePress = (item: WorkStation) => {
		handleWorkStation({
			title: item.workstation,
			id: item.id,
		});

		router.push('/licenceapplication');
	};

	return (
		<View style={globalStyles.container}>
			<Searchbar
				placeholder='Search workstation'
				onChangeText={handleSearch}
				value={search}
				style={styles.searchBar}
			/>
			<FlatList
				data={filtered}
				renderItem={({ item }) => (
					<ContentBox
						box={{
							title: item.workstation,
							id: item.id,
						}}
						action={() => handlePress(item)}
					/>
				)}
				keyExtractor={(_, index) => String(index)}
				onRefresh={refetch}
				refreshing={isRefetching}
				ListEmptyComponent={
					<EmptyList message='Could load workstations. Please check your internet and retry' />
				}
			/>
		</View>
	);
};

export default WorkStationsComponent;

const styles = StyleSheet.create({
	searchBar: {
		backgroundColor: '#dbe6f5',
		margin: 5,
		padding: 2,
		borderRadius: 10,
	},
});
