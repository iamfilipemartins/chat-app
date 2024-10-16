import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth";
import { StatusBar } from "expo-status-bar";
import Contact from "@/components/contact";
import Loading from "@/components/loading";
import { getDocs, query, where } from "firebase/firestore";
import { users } from "@/firebaseConfig";
import Button from "@/components/button";
import { useRouter } from "expo-router";

const Chats: React.FC = () => {
  const { handleSignOut, user } = useAuthContext();
  const [contacts, setContacts] = useState<any>([]);
  const router = useRouter();

  const getContacts = async (userId: string) => {
    const queryContacts: any = query(users, where("userId", "!=", userId));
    const getContactsFromDoc: any = await getDocs(queryContacts);
    let data: any = [];

    getContactsFromDoc.forEach((contact: any) => {
      data.push(contact.data());
    });

    setContacts(data);
  };

  useEffect(() => {
    if (user?.userId) getContacts(user?.userId);
  }, []);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Contact
      title={item?.email}
      description={item?.email || "Start a new chat"}
      rightText={item?.email}
      rightIconName="chevron-forward-outline"
      lastContact={index === contacts?.length - 1}
      onPress={() => {
        router.push({ pathname: "/chat", params: item });
      }}
    />
  );

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar style="light" />
      {contacts?.length ? (
        <View className="flex-1">
          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={(item) => item.userId}
          />
          <View className="p-4">
            <Button title={"Sign Out"} onPress={handleSignOut} />
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Chats;
