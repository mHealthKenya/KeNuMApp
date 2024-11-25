import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import EntryView from "../../components/knowledgebase/scope/entry";
import NephrologyView from "../../components/knowledgebase/scope/nephrology";
import NeonatalView from "../../components/knowledgebase/scope/neonatal";

const neonatal = () => {
  return (
    <View className="flex flex-1">
      <NeonatalView />
    </View>
  );
};

export default neonatal;

const styles = StyleSheet.create({});
