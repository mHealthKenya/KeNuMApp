import {FlashList} from '@shopify/flash-list';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import HomeBox from '../../components/knowledgebase/home';
import EmptyList from '../../components/shared/EmptyList';
import {useSearch} from '../../providers/search';
import globalStyles from '../../styles/global';
import {Item} from './policy_brief';

const Research = () => {
	const {search, handleSearch} = useSearch();
	const items: Item[] = [];

	const Items = items.sort((a, b) => a.title.localeCompare(b.title));

	const filteredItems = useMemo(
		() =>
			Items?.filter(
				(item) =>
					item.title.toLowerCase().includes(search.toLowerCase()) ||
					item.content.toLowerCase().includes(search.toLowerCase())
			),
		[search, Items]
	);
	return (
		<View style={globalStyles.container}>
			<Searchbar
				placeholder='Start typing...'
				onChangeText={handleSearch}
				value={search}
				style={{
					backgroundColor: '#dbe6f5',
					margin: 5,
					padding: 2,
					borderRadius: 10,
				}}
			/>
			<FlashList
				data={filteredItems}
				renderItem={({item}) => <HomeBox routing={item} />}
				keyExtractor={(_, index) => String(index)}
				estimatedItemSize={150}
				ListEmptyComponent={<EmptyList message='This section has no items at the moment. Please check again later' />}
			/>
		</View>
	);
};

export default Research;
