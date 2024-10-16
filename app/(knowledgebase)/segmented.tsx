import {FlashList} from '@shopify/flash-list';
import React, {FC} from 'react';
import {View} from 'react-native';
import HomeBox, {KnowBox} from '../../components/knowledgebase/home';
import {KnowledgeBase} from '../../models/knowledgebase';
import {useSearch} from '../../providers/search';
import globalStyles from '../../styles/global';

const KnowledgeComponent: FC<{
	items: KnowledgeBase[];
	refetch: () => void;
	isRefetching: boolean;
}> = () => {
	const {search, handleSearch} = useSearch();

	const items: KnowBox[] = [
		{
			title: 'Policies and Manual',
			content: 'Streamlining Procedures for Consistency and Effective Action',
			url: 'allknowledge',
		},

		{
			title: 'Research Papers',
			content: 'Advancing Knowledge through Rigorous and Innovative Research Studies',
			url: 'research',
		},

		{
			title: 'Scop of Practice',
			content: 'Ensuring Competence and Compliance in Professional Practice',
			url: 'allknowledge',
		},
	];

	return (
		<View style={globalStyles.container}>
			<FlashList
				data={items}
				renderItem={({item}) => <HomeBox routing={item} />}
				keyExtractor={(_, index) => String(index)}
				estimatedItemSize={150}
			/>
		</View>
	);
};

export default KnowledgeComponent;
