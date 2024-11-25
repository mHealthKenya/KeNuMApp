import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import EntryView from "../../components/knowledgebase/scope/entry";
import NephrologyView from "../../components/knowledgebase/scope/nephrology";
import PaediatricCriticalView from "../../components/knowledgebase/scope/paediatriccritical";

const paediatriccritical = () => {
  return (
    <View className="flex flex-1">
      <PaediatricCriticalView />
    </View>
  );
};

export default paediatriccritical;

const styles = StyleSheet.create({});
