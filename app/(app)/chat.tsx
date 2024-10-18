import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/header";
import { useAuthContext } from "@/context/auth";
import Message from "@/components/message";
import InputMessage from "@/components/inputMessage";
import { getChatId } from "@/utils";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Loading from "@/components/loading";

const Chat: React.FC = () => {
  const { user, createChat, sendMessage } = useAuthContext();
  const userChat = useLocalSearchParams();
  const [messages, setMessages] = useState<any>([]);
  const [disabled, setDisabled] = useState<boolean>(true);
  const chatMessageRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const flatlistRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleChangeMessage = (value: string | undefined) => {
    setDisabled(!value?.length);
    chatMessageRef.current = value;
  };

  const handleSendMessage = async () => {
    if (chatMessageRef.current) {
      const response: any = await sendMessage(
        userChat?.userId.toString(),
        chatMessageRef.current,
      );
      if (response?.success) {
        chatMessageRef.current = null;
      }
      if (inputRef?.current) inputRef.current.clear();
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Message
      first={index === 0}
      date={new Date(item?.createdAt?.seconds * 1000)}
      item={item}
    />
  );

  useEffect(() => {
    setLoading(true);
    createChat(userChat?.userId.toString());

    const chatId = getChatId(user?.userId, userChat?.userId.toString());

    const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId),
      orderBy("chatId", "desc"),
    );

    let unsub = onSnapshot(q, (snap) => {
      let messages = snap.docs.map((item: any) => item.data());
      setMessages([...messages]);
      setLoading(false);
    });

    return unsub;
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-slate-50">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Header userToChat={userChat?.email} />
          <StatusBar style="light" />
          {loading ? (
            <Loading />
          ) : (
            <View className="flex-1">
              {!!messages?.length ? (
                <View>
                  <FlatList
                    ref={flatlistRef}
                    inverted
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item?.messageId}
                    nestedScrollEnabled
                    contentContainerStyle={{ flexGrow: 1 }}
                  />
                </View>
              ) : (
                <View className="flex-1 items-center justify-center">
                  <Image
                    style={{ height: 160 }}
                    resizeMode="contain"
                    source={require("../../assets/images/logo.png")}
                  />
                </View>
              )}
            </View>
          )}

          <View className="p-2">
            <InputMessage
              innerRef={inputRef}
              sendIconColor="white"
              sendDisabled={disabled}
              onChangeText={handleChangeMessage}
              sendIconClick={handleSendMessage}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Chat;
