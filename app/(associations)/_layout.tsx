import { Stack } from "expo-router";
import React from "react";
import ProfileHeaderLeft from "../../components/profile/HeaderLeft";

const StudentsLayout = () => {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="kpna"
        options={{
          title: "KPNA",
          headerLeft: () => <ProfileHeaderLeft />,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#3c6470",
          },

          headerTitleStyle: {
            color: "#FFF",
          },
        }}
      />
      <Stack.Screen
        name="nnak"
        options={{
          title: "NNAK",
          headerLeft: () => <ProfileHeaderLeft />,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FF3C33",
          },

          headerTitleStyle: {
            color: "#FFF",
          },
          contentStyle: {
            borderTopColor: "#00ff00",
            borderTopWidth: 2,
          },
        }}
      />
    </Stack>
  );
};

export default StudentsLayout;
