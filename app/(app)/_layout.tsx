import React from "react";
import { Stack } from "expo-router";
import Header from "@/components/header";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name={"contacts"}
        options={{
          header: () => <Header showChats />,
        }}
      />
      <Stack.Screen
        name={"chats"}
        options={{
          header: () => <Header showContacts />,
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
