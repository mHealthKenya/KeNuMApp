import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import EntryView from "../../components/knowledgebase/scope/entry";

const entry = () => {
  return (
    <View className="flex flex-1">
      <EntryView />
    </View>
  );
};

export default entry;

const styles = StyleSheet.create({});
