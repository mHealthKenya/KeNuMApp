import {FlashList} from '@shopify/flash-list';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import HomeBox from '../../components/knowledgebase/home';
import {useSearch} from '../../providers/search';
import globalStyles from '../../styles/global';
import {Href} from 'expo-router';

export interface Item {
	title: string;
	content: string;
	url: Href;
}

const Policy = () => {
	const {search, handleSearch} = useSearch();

	const items: Item[] = [
		{
			title: '001/2024 Code Of Conduct and Ethics',
			content: 'Code Of Conduct and Ethics of Nurses in Kenya',
			url: '/code_of_conduct',
		},

		{
			title: '002/2024 Nurse to Patient',
			content: 'Nurse to Patient Ratio',
			url: '/ratio',
		},
	];

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
			{/* <PolicyBrief /> */}
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
			/>
		</View>
	);
};

export default Policy;

// const styles = StyleSheet.create({});
