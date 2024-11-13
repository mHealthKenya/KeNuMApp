import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import PolicyBrief from '../../components/knowledgebase/policies/brief'
import { FlashList } from '@shopify/flash-list';
import HomeBox from '../../components/knowledgebase/home';
import { Searchbar } from 'react-native-paper';
import { KnowBox } from '../../components/knowledgebase/knowbox';
import { useSearch } from '../../providers/search';
import globalStyles from '../../styles/global';

const policy_brief = () => {
    const {search, handleSearch} = useSearch();

	const Items = [
		{
			title: '001/2024 Code Of Conduct and Ethics',
			content: 'Code Of Conduct and Ethics of Nurses in Kenya',
			url: 'code_of_conduct',
		},

		{
			title: '002/2024 Nurse to Patient Ratio',
			content: 'Nurse to Patient Ratio',
			url: 'ratio',
		},

	];
    const filteredItems = useMemo(() => Items?.filter((item) => 
        item.title.toLowerCase().includes(search.toLowerCase()) || item.content.toLowerCase().includes(search.toLowerCase())
    ), [search, Items]);
  return (
    <View  style={globalStyles.container}>
			{/* <PolicyBrief /> */}
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
        renderItem={({ item }) => <HomeBox routing={item} />}
        keyExtractor={(_, index) => String(index)}
        estimatedItemSize={150}
      />
		</View>
  )
}

export default policy_brief

const styles = StyleSheet.create({})
