import React from "react";
import { View } from "react-native";
import RatioView from "../../components/knowledgebase/research/ratio";
import { FlashList } from "@shopify/flash-list";
import HomeBox from "../../components/knowledgebase/home";
import { SafeAreaView } from "@gluestack-ui/themed";
import { useSearch } from "../../providers/search";
import globalStyles from "../../styles/global";

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
      url: "code_of_conduct",
    },
    {
      title: "Final APN scope of practice",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "code_of_conduct",
    },
    {
      title: "FINAL ENTRY LEVEL SCOPE OF PRACTICE",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "code_of_conduct",
    },
    {
      title: "mental health-psychiatry scope of practice March 2022",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "code_of_conduct",
    },
    {
      title: "Neonatal Nursing Scope of Practice",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "code_of_conduct",
    },
    {
      title: "Nephrology Scope of Practice",
      content:
        "Advancing Knowledge through Rigorous and Innovative Research Studies",
      url: "code_of_conduct",
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
  return (
    <View style={globalStyles.container}>
      <FlashList
        data={Items}
        renderItem={({ item }) => <HomeBox routing={item} />}
        keyExtractor={(_, index) => String(index)}
        estimatedItemSize={150}
      />
    </View>
  );
};

export default AllScope;
