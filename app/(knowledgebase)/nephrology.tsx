import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import EntryView from "../../components/knowledgebase/scope/entry";
import NephrologyView from "../../components/knowledgebase/scope/nephrology";

const nephrology = () => {
  return (
    <View className="flex flex-1">
      <NephrologyView />
    </View>
  );
};

export default nephrology;

const styles = StyleSheet.create({});
