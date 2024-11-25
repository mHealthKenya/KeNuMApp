import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import EntryView from "../../components/knowledgebase/scope/entry";
import NephrologyView from "../../components/knowledgebase/scope/nephrology";
import PalliativeView from "../../components/knowledgebase/scope/palliative";

const palliative = () => {
  return (
    <View className="flex flex-1">
      <PalliativeView />
    </View>
  );
};

export default palliative;

const styles = StyleSheet.create({});
