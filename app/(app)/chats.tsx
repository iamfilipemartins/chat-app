import { View, Text, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth";
import { StatusBar } from "expo-status-bar";
import Contact from "@/components/contact";
import Loading from "@/components/loading";
import { useRouter } from "expo-router";

const Chats: React.FC = () => {
  const { getUserContacts } = useAuthContext();
  const [contacts, setContacts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const getContacts = async () => {
    setLoading(true);
    const response: any = await getUserContacts();
    setContacts(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    getContacts();
  }, []);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Contact
      contact={item}
      last={index === contacts?.length - 1}
      onPress={() => {
        router.push({ pathname: "/chat", params: item });
      }}
    />
  );

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
      {contacts?.length ? (
        <View className="flex-1">
          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={(item) => item.userId}
            nestedScrollEnabled
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text style={{ fontFamily: "Inter_400Regular" }}>
            No chats available for the moment
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Chats;
