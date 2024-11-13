import {FlashList} from '@shopify/flash-list';
import React, {FC, useMemo} from 'react';
import {View} from 'react-native';
import HomeBox, {KnowBox} from '../../components/knowledgebase/home';
import {KnowledgeBase} from '../../models/knowledgebase';
import {useSearch} from '../../providers/search';
import globalStyles from '../../styles/global';
import { Searchbar } from 'react-native-paper';

const KnowledgeComponent: FC<{
	items: KnowledgeBase[];
	refetch: () => void;
	isRefetching: boolean;
}> = () => {
	const {search, handleSearch} = useSearch();

	const items: KnowBox[] = [
		{
			title: 'Policies and Manuals',
			content: 'Streamlining Procedures for Consistency and Effective Action',
			url: 'allknowledge',
		},

		{
			title: 'Research Papers',
			content: 'Advancing Knowledge through Rigorous and Innovative Research Studies',
			url: 'research',
		},

		{
			title: 'Scope of Practice',
			content: 'Ensuring Competence and Compliance in Professional Practice',
			url: 'allscope',
		},
        {
			title: 'Policy Briefs',
			content: 'Ensuring Competence and Compliance in Professional Practice',
			url: 'policy_brief',
		},
	];

    const filteredItems = useMemo(() => items?.filter((item) => 
        item.title.toLowerCase().includes(search.toLowerCase()) || item.content.toLowerCase().includes(search.toLowerCase())
    ), [search, items]);

	return (
		<View style={globalStyles.container}>
            <Searchbar
                placeholder=''
                onChangeText={handleSearch}
                value={search}
                style={{backgroundColor: '#dbe6f5',
                    margin: 5,
                    padding: 2,
                    borderRadius: 10}}/>
			<FlashList
				data={filteredItems}
				renderItem={({item}) => <HomeBox routing={item} />}
				keyExtractor={(_, index) => String(index)}
				estimatedItemSize={150}
			/>
		</View>
	);
};

export default KnowledgeComponent;
