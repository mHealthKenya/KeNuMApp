import { Stack } from "expo-router";
import React from "react";
import ProfileHeaderLeft from "../../components/profile/HeaderLeft";
import KnowledgeProvider from "../../providers/knowledge";

const KnowledgeLayout = () => {
  return (
    <KnowledgeProvider>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#0445b5",
          },

          headerTitleStyle: {
            color: "#FFF",
          },
        }}
      >
        <Stack.Screen
          name="segmented"
          options={{
            title: "Knowledge Base",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="allknowledge"
          options={{
            title: "Policies and Manual",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />

        <Stack.Screen
          name="research"
          options={{
            // headerShown: false,
            title: "Research",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />

        <Stack.Screen
          name="policy_brief"
          options={{
            // headerShown: false,
            title: "Policy Brief",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="allscope"
          options={{
            // headerShown: false,
            title: "Scope of Practice",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="apm"
          options={{
            // headerShown: false,
            title: "APM",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="criitcal"
          options={{
            // headerShown: false,
            title: "Critical Care Scope",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="apn"
          options={{
            // headerShown: false,
            title: "APN",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="entry"
          options={{
            // headerShown: false,
            title: "Entry Level SoP",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />

        <Stack.Screen
          name="mental"
          options={{
            // headerShown: false,
            title: "Mental Health SoP",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />

        <Stack.Screen
          name="neonatal"
          options={{
            // headerShown: false,
            title: "Neonatal SoP",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="nephrology"
          options={{
            // headerShown: false,
            title: "Nephrology SoP",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="critical"
          options={{
            // headerShown: false,
            title: "CCN",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="oncology"
          options={{
            // headerShown: false,
            title: "Oncology Nursing SoP",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="paediatriccritical"
          options={{
            // headerShown: false,
            title: "Paediatric Critical Care SoP",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="paediatricscope"
          options={{
            // headerShown: false,
            title: "Paediatric SoP",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="palliative"
          options={{
            // headerShown: false,
            title: "Palliative SoP",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="perioperative"
          options={{
            // headerShown: false,
            title: "Perioperative SoP",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="codec"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ratio"
          options={{
            // headerShown: false,
            title: "Ratio",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="code_of_conduct"
          options={{
            // headerShown: false,
            title: "Code of Conduct",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="standard"
          options={{
            // headerShown: false,
            title: "Standards of Practice",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
        <Stack.Screen
          name="manual"
          options={{
            // headerShown: false,
            title: "Manual",
            headerLeft: () => <ProfileHeaderLeft />,
          }}
        />
      </Stack>
    </KnowledgeProvider>
  );
};

export default KnowledgeLayout;
