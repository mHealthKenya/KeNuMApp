import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import APMView from "../../components/knowledgebase/scope/apm";

const apm = () => {
  return (
    <View className="flex flex-1">
      <APMView />
    </View>
  );
};

export default apm;

const styles = StyleSheet.create({});
