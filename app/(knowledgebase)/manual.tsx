import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import ManualView from "../../components/knowledgebase/scope/manual";

const manual = () => {
  return (
    <View className="flex flex-1">
      <ManualView />
    </View>
  );
};

export default manual;

const styles = StyleSheet.create({});
