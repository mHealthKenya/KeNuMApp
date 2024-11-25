import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RatioView from "../../components/knowledgebase/research/ratio";
import APNView from "../../components/knowledgebase/scope/apn";

const apn = () => {
  return (
    <View className="flex flex-1">
      <APNView />
    </View>
  );
};

export default apn;

const styles = StyleSheet.create({});
