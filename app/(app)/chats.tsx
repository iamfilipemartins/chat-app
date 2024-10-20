import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth";
import { StatusBar } from "expo-status-bar";
import Loading from "@/components/loading";
import { useRouter } from "expo-router";
import {
  collection,
  or,
  query,
  where,
  orderBy,
  onSnapshot,
  and,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import ChatItem from "@/components/chatItem";

const Chats: React.FC = () => {
  const [chats, setChats] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);

    const q = query(
      collection(db, "chats"),
      and(
        or(
          where("userFromId", "==", user?.userId),
          where("userToId", "==", user?.userId)
        ),
        where("lastMessageTime", "!=", null)
      ),
      orderBy("lastMessageTime", "desc")
    );

    let unsub = onSnapshot(q, (snap) => {
      let chats = snap.docs.map((item: any) => item.data());
      setChats(chats);
      setLoading(false);
    });

    return unsub;
  }, []);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const chatUser = {
      userId:
        user?.userId === item?.userFromId ? item?.userToId : item?.userFromId,
      email:
        user?.email === item?.userFromEmail
          ? item?.userToEmail
          : item?.userFromEmail,
    };

    return (
      <ChatItem
        chat={item}
        chatUser={chatUser}
        last={index === chats?.length - 1}
        onPress={() => {
          router.push({ pathname: "/chat", params: chatUser });
        }}
      />
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-slate-50">
        <StatusBar style="light" />
        <Loading />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar style="light" />
      {chats?.length ? (
        <View className="flex-1">
          <FlatList
            data={chats}
            renderItem={renderItem}
            keyExtractor={(item) => item.chatId}
            nestedScrollEnabled
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Image
            style={{ height: 160 }}
            resizeMode="contain"
            source={require("../../assets/images/logo.png")}
          />
          <Text
            className="text-center"
            style={{ fontFamily: "Inter_500Medium" }}
          >
            You have no active chats.
          </Text>
          <Text
            className="text-center"
            style={{ fontFamily: "Inter_500Medium" }}
          >
            See your
            <Text
              onPress={() => router.replace("contacts")}
              className="text-blue-500"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              {" contacts "}
            </Text>
            and start a new one!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Chats;
