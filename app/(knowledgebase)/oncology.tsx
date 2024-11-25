import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import EntryView from "../../components/knowledgebase/scope/entry";
import NephrologyView from "../../components/knowledgebase/scope/nephrology";
import OncologyView from "../../components/knowledgebase/scope/oncology";

const oncology = () => {
  return (
    <View className="flex flex-1">
      <OncologyView />
    </View>
  );
};

export default oncology;

const styles = StyleSheet.create({});
