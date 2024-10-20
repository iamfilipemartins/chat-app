import { View, Text, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth";
import { StatusBar } from "expo-status-bar";
import Contact from "@/components/contactItem";
import Loading from "@/components/loading";
import { useRouter } from "expo-router";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const Contacts: React.FC = () => {
  const { user } = useAuthContext();
  const [contacts, setContacts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    const q = query(
      collection(db, "users"),
      where("userId", "!=", user?.userId),
    );

    let unsub = onSnapshot(q, (snap) => {
      let contacts = snap.docs.map((item: any) => item.data());
      setContacts(contacts);
      setLoading(false);
    });

    return unsub;
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
            No contacts available for the moment
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Contacts;
