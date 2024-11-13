import React, { useMemo } from "react";
import { View } from "react-native";
import RatioView from "../../components/knowledgebase/research/ratio";
import { FlashList } from "@shopify/flash-list";
import HomeBox from "../../components/knowledgebase/home";
import { SafeAreaView } from "@gluestack-ui/themed";
import { useSearch } from "../../providers/search";
import globalStyles from "../../styles/global";
import { Searchbar } from "react-native-paper";

const AllScope = () => {
  const { search, handleSearch } = useSearch();

  const Items = [
    // {
    //   title: "Policies and Manuals",
    //   content: "Streamlining Procedures for Consistency and Effective Action",
    //   url: "ratio",
    // },
    // {
    //   title: "Code Of Conduct",
    //   content:
    //     "Advancing Knowledge through Rigorous and Innovative Research Studies",
    //   url: "code_of_conduct",
    // },
    {
      title: "APM Scope of Practice",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "apm",
    },
    {
      title: "Critical Care Scope",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "critical",
    },
    {
      title: "Final APN scope of practice",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "apn",
    },
    {
      title: "FINAL ENTRY LEVEL SCOPE OF PRACTICE",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "entry",
    },
    {
      title: "mental health-psychiatry scope of practice March 2022",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "mental",
    },
    {
      title: "Neonatal Nursing Scope of Practice",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "neonatal",
    },
    {
      title: "Nephrology Scope of Practice",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "nephrology",
    },
    {
      title: "Oncology nursing scope of practice March 2022",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "code_of_conduct",
    },
    {
      title: "Paediatric Critical care scope of practice March 2022",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "code_of_conduct",
    },
    {
      title: "Paediatric Scope of Practice",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "code_of_conduct",
    },
    {
      title: "palliative Scope",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "code_of_conduct",
    },
    {
      title: "Perioperative Scope of Practice",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "code_of_conduct",
    },
  ];

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

export default AllScope;
