import React from 'react';
import {View} from 'react-native';
import RatioView from '../../components/knowledgebase/research/ratio';
import { FlashList } from '@shopify/flash-list';
import HomeBox from '../../components/knowledgebase/home';
import { SafeAreaView } from '@gluestack-ui/themed';

const Research = () => {
    const Items = [
        {
			title: 'Policies and Manuals',
			content: 'Streamlining Procedures for Consistency and Effective Action',
			url: 'ratio',
		},

		{
			title: 'Code Of Conduct',
			content: 'Advancing Knowledge through Rigorous and Innovative Research Studies',
			url: 'code_of_conduct',
		},
    ]
	return (
		<View className='flex flex-1 mt-20'>
			<FlashList
				data={Items}
				renderItem={({item}) => <HomeBox routing={item} />}
				keyExtractor={(_, index) => String(index)}
				estimatedItemSize={150}
			/>
		</View>
	);
};

export default Research;
