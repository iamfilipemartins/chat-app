import React from "react";
import { Stack } from "expo-router";
import Header from "@/components/header";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name={"chats"}
        options={{
          header: () => <Header />,
        }}
      />
      <Stack.Screen
        name={"chat"}
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
