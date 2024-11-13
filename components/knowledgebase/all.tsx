import { FlashList } from "@shopify/flash-list";
import React, { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { KnowledgeBase } from "../../models/knowledgebase";
import { useSearch } from "../../providers/search";
import globalStyles from "../../styles/global";
import KnowledgeBox from "./knowbox";
import HomeBox from "./home";

const KnowledgeComponent: FC<{
  items: KnowledgeBase[];
  refetch: () => void;
  isRefetching: boolean;
}> = ({ items, refetch, isRefetching }) => {
  const { search, handleSearch } = useSearch();

  // Filter the knowledge items based on the search query
  const filteredKnowledge = useMemo(
    () =>
      items.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(search.toLowerCase())
      ),
    [search, items]
  );

  // Additional static items (like HomeBox content)
  const additionalItems = [
    {
      type: "manual",
      title: "Clinical Procedure Manuals",
      content: "Streamlining Procedures for Consistency and Effective Action",
      url: "manual",
    },
  ];

  // Combine both filtered knowledge items and additional items into a single list
  const combinedData = [...filteredKnowledge, ...additionalItems];

  // Render function to differentiate between `KnowledgeBox` and `HomeBox`
  const renderItem = ({ item }: { item: any }) => {
    if (item.type === "manual") {
      return <HomeBox routing={item} />;
    }
    return <KnowledgeBox box={item} />;
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Searchbar
        placeholder="Start typing..."
        onChangeText={handleSearch}
        value={search}
        style={styles.searchBar}
      />
      <FlashList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={(_, index) => String(index)}
        onRefresh={refetch}
        refreshing={isRefetching}
        estimatedItemSize={150}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default KnowledgeComponent;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
  searchBar: {
    backgroundColor: "#dbe6f5",
    margin: 5,
    padding: 2,
    borderRadius: 10,
  },
  listContent: {
    paddingBottom: 0,
  },
});

// import {FlashList} from '@shopify/flash-list';
// import React, {FC, useMemo} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {Searchbar} from 'react-native-paper';
// import {KnowledgeBase} from '../../models/knowledgebase';
// import {useSearch} from '../../providers/search';
// import globalStyles from '../../styles/global';
// import KnowledgeBox from './knowbox';

// const KnowledgeComponent: FC<{
// 	items: KnowledgeBase[];
// 	refetch: () => void;
// 	isRefetching: boolean;
// }> = ({items, refetch, isRefetching}) => {
// 	const {search, handleSearch} = useSearch();

// 	const filtered = useMemo(
// 		() =>
// 			items.filter(
// 				(item) =>
// 					item.title.toLowerCase().includes(search.toLowerCase()) ||
// 					item.subtitle.toLowerCase().includes(search.toLowerCase())
// 			),
// 		[search, items]
// 	);
// 	return (
// 		<View style={globalStyles.container}>
// 			<Searchbar placeholder='Start typing...' onChangeText={handleSearch} value={search} style={styles.searchBar} />
// 			<FlashList
// 				data={filtered}
// 				renderItem={({item}) => <KnowledgeBox box={item} />}
// 				keyExtractor={(_, index) => String(index)}
// 				onRefresh={refetch}
// 				refreshing={isRefetching}
// 				estimatedItemSize={150}
// 			/>
// 		</View>
// 	);
// };

// export default KnowledgeComponent;

// const styles = StyleSheet.create({
// 	searchBar: {
// 		backgroundColor: '#dbe6f5',
// 		margin: 5,
// 		padding: 2,
// 		borderRadius: 10,
// 	},
// });
