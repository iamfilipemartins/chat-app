import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";

const Chat: React.FC = () => {
  const userChat = useLocalSearchParams();
  return (
    <View className="flex-1 bg-emerald-50">
      <StatusBar style="light" />
      <Text>{JSON.stringify(userChat)}</Text>
    </View>
  );
};

export default Chat;
