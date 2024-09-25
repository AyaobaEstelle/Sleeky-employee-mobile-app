import React from "react";
import { Stack } from "expo-router";

const TabLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="employee-form" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen
          name="employee-details"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
};

export default TabLayout;
