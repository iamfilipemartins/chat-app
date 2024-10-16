import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/components/header";
import { useAuthContext } from "@/context/auth";
import Message from "@/components/message";
import InputMessage from "@/components/inputMessage";

const Chat: React.FC = () => {
  const { user } = useAuthContext();
  const userChat = useLocalSearchParams();
  const router = useRouter();

  const [messages, setMessages] = useState([
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
    { userId: "1", description: "asv" },
  ]);
  const [disabled, setDisabled] = useState<boolean>(true);

  const messageRef = useRef<any>("");

  const handleChangeMessage = (value: string | undefined) => {
    setDisabled(!value?.length);
    messageRef.current = value;
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Message
      description={item?.description || "Start a new chat"}
      side={item.userId === userChat.userId ? "right" : "left"}
      onPress={() => {
        router.back();
      }}
    />
  );

  return (
    <View className="flex-1 bg-emerald-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        style={{ flex: 1 }}
      >
        <Header userToChat={userChat?.email} />
        <StatusBar style="light" />
        <View className="flex-1 justify-between overflow-visible">
          <View className="flex-1">
            {!!messages?.length ? (
              <View className="flex-1">
                <FlatList
                  data={messages}
                  renderItem={renderItem}
                  keyExtractor={(item, index) =>
                    item.userId.concat("-", index.toString())
                  }
                />
              </View>
            ) : (
              <Text className="flex-1 self-center">Inicie a conversa</Text>
            )}
          </View>
        </View>
        <View className="p-2">
          <InputMessage
            sendDisabled={disabled}
            onChangeText={handleChangeMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;
