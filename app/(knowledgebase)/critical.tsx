import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import CriticalView from "../../components/knowledgebase/scope/critical";

const critical = () => {
  return (
    <View className="flex flex-1">
      <CriticalView />
    </View>
  );
};

export default critical;

const styles = StyleSheet.create({});
