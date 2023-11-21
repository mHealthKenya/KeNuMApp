import React, { FC, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import { FAQ } from '../../models/faqs';
import { useSearch } from '../../providers/search';
import globalStyles from '../../styles/global';

const FAQComponent: FC<{ faq: FAQ }> = ({ faq }) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpanded = () => {
		setExpanded(!expanded);
	};

	return (
		<View style={[styles.spacer]}>
			<List.Accordion
				title={faq.title}
				expanded={expanded}
				onPress={handleExpanded}
				titleStyle={{
					flex: 1,
					letterSpacing: 2,
					fontSize: 17,
				}}
				titleNumberOfLines={500}
				style={{
					backgroundColor: '#dcf0fa',
					borderRadius: 10,
					justifyContent: 'center',
				}}>
				<View
					style={{
						paddingVertical: 10,
					}}>
					<List.Item
						title={faq.content}
						titleNumberOfLines={1000}
						titleStyle={{
							letterSpacing: 2,
							fontSize: 20,
						}}
						style={{
							backgroundColor: '#e1e8ed',
							padding: 10,
							marginVertical: 5,
							borderRadius: 10,
						}}
					/>
				</View>
			</List.Accordion>
		</View>
	);
};

const AllFAQsComponent: FC<{
	faqs: FAQ[];
	refetch: () => void;
	isRefetching: boolean;
}> = ({ faqs, refetch, isRefetching }) => {
	const { search, handleSearch } = useSearch();

	const items = useMemo(
		() =>
			faqs.filter(
				(item) =>
					item.title.toLowerCase().includes(search.toLowerCase()) ||
					item.content.toLowerCase().includes(search.toLowerCase())
			),
		[search, faqs]
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
				data={items}
				renderItem={({ item }) => <FAQComponent faq={item} />}
				keyExtractor={(item) => '' + item.id}
				onRefresh={refetch}
				refreshing={isRefetching}
			/>
		</View>
	);
};

export default AllFAQsComponent;

const styles = StyleSheet.create({
	spacer: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
	},

	searchBar: {
		backgroundColor: '#dbe6f5',
		margin: 5,
		padding: 2,
		borderRadius: 10,
	},
});
