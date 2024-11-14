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
      content: "Advanced Practice Midwives Scope of Practice in Kenya",
      url: "apm",
    },
    {
      title: "APN scope of practice",
      content: "Advanced Nursing Practice in Kenya.",
      url: "apn",
    },
    {
      title: "Critical Care Scope",
      content: "Critical care Scope of Policy for Nurses and Midwives in Kenya",
      url: "critical",
    },
    {
      title: "Entry level Scope of Practice",
      content: "Scope of Practice for Entry Level Nurses and Midwives in Kenya",
      url: "entry",
    },
    {
      title: "Mental Health-Psychiatry Scope of Practice",
      content: "Mental Health for Psychiatric Nurses in Kenya",
      url: "mental",
    },
    {
      title: "Neonatal Nursing Scope of Practice",
      content: "Neonatal Scope of Practice for Nursing and Midwives in Kenya",
      url: "neonatal",
    },
    {
      title: "Nephrology Scope of Practice",
      content: "Nephrology Scope of Practice for Nurses and Midwives in Kenya",
      url: "nephrology",
    },
    {
      title: "Oncology nursing scope of practice",
      content: "Oncology SoP for nurses and Midwives in Kenya",
      url: "oncology",
    },
    {
      title: "Paediatric Critical care scope of practice",
      content:
        "Pediatric Critical care scope of Practice for Nurses and Midwives in Kenya",
      url: "paediatriccritical",
    },
    {
      title: "Paediatric Scope of Practice",
      content: "Paediatric Scope of Practice for Nurses and Midwives in Kenya",
      url: "paediatricscope",
    },
    {
      title: "Palliative Scope",
      content: "Palliative Scope of Practice for Nurses and Midwives in Kenya",
      url: "palliative",
    },
    {
      title: "Perioperative Scope of Practice",
      content: "Practice for Nurses and Midwives in Kenya",
      url: "perioperative",
    },
  ];

  const filteredItems = useMemo(
    () =>
      Items?.sort((a, b) => a.title.localeCompare(b.title)).filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.content.toLowerCase().includes(search.toLowerCase())
      ),
    [search, Items]
  );
  return (
    <View style={globalStyles.container}>
      <Searchbar
        placeholder="Start typing..."
        onChangeText={handleSearch}
        value={search}
        style={{
          backgroundColor: "#dbe6f5",
          margin: 5,
          padding: 2,
          borderRadius: 10,
        }}
      />
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
