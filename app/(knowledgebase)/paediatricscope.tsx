import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import EntryView from "../../components/knowledgebase/scope/entry";
import NephrologyView from "../../components/knowledgebase/scope/nephrology";
import PaediatricScopeView from "../../components/knowledgebase/scope/paediaticscope";

const paediatricscope = () => {
  return (
    <View className="flex flex-1">
      <PaediatricScopeView />
    </View>
  );
};

export default paediatricscope;

const styles = StyleSheet.create({});
