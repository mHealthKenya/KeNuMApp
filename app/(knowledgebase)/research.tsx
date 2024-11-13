import React, { useMemo } from "react";
import { View } from "react-native";
import RatioView from "../../components/knowledgebase/research/ratio";
import { FlashList } from "@shopify/flash-list";
import HomeBox from "../../components/knowledgebase/home";
import { SafeAreaView } from "@gluestack-ui/themed";
import globalStyles from "../../styles/global";
import { useSearch } from "../../providers/search";
import { Searchbar } from "react-native-paper";

const Research = () => {
    const {search, handleSearch} = useSearch()
  const Items = [
    {
      title: "",
      content: "",
      url: "",
    },

    // {
    //   title: "Code Of Conduct",
    //   content:
    //     "Advancing Knowledge through Rigorous and Innovative Research Studies",
    //   url: "code_of_conduct",
    // },
  ].sort((a, b) => a.title.localeCompare(b.title));

  const filteredItems = useMemo(() => Items?.filter((item) => 
    item.title.toLowerCase().includes(search.toLowerCase()) || item.content.toLowerCase().includes(search.toLowerCase())
), [search, Items]);
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
        renderItem={({ item }) => <HomeBox routing={item} />}
        keyExtractor={(_, index) => String(index)}
        estimatedItemSize={150}
      />
    </View>
  );
};

export default Research;
