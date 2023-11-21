import { View, Text, FlatList } from 'react-native';
import React, { FC, useMemo } from 'react';
import { County } from '../../models/counties';
import ContentBox from './contentbox';
import globalStyles from '../../styles/global';
import { useWorkStationFetched } from '../../providers/workstations';
import { useRouter } from 'expo-router';
import { Searchbar } from 'react-native-paper';
import { useSearch } from '../../providers/search';
import { StyleSheet } from 'react-native';

const CountiesComponent: FC<{ counties: County[] }> = ({ counties }) => {
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
