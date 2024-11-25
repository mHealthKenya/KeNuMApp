import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import EntryView from "../../components/knowledgebase/scope/entry";
import NephrologyView from "../../components/knowledgebase/scope/nephrology";
import PerioperativeView from "../../components/knowledgebase/scope/perioperative";

const perioperative = () => {
  return (
    <View className="flex flex-1">
      <PerioperativeView />
    </View>
  );
};

export default perioperative;

const styles = StyleSheet.create({});
