import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import EntryView from "../../components/knowledgebase/scope/entry";
import NephrologyView from "../../components/knowledgebase/scope/nephrology";
import NeonatalView from "../../components/knowledgebase/scope/neonatal";
import MentalView from "../../components/knowledgebase/scope/mental";

const mental = () => {
  return (
    <View className="flex flex-1">
      <MentalView />
    </View>
  );
};

export default mental;

const styles = StyleSheet.create({});
