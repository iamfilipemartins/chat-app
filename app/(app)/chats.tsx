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
  const [loading, setLoading] = useState<boolean>(false);
  const [signOutLoading, setSignOutLoading] = useState<boolean>(false);
  const router = useRouter();

  const getContacts = async (userId: string) => {
    setLoading(true);
    const queryContacts: any = query(users, where("userId", "!=", userId));
    const getContactsFromDoc: any = await getDocs(queryContacts);
    let data: any = [];

    getContactsFromDoc.forEach((contact: any) => {
      data.push(contact.data());
    });

    setContacts(data);
    setLoading(false);
  };

  const signOut = async () => {
    setSignOutLoading(true);
    await handleSignOut();
    setSignOutLoading(false)
  }

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

  if (loading) {
    return (
      <View className="flex-1 bg-slate-50">
        <StatusBar style="light" />
        <Loading />
      </View>
    );
  }

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
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text>No chats available for the moment</Text>
        </View>
      )}
      <View className="p-4">
        <Button isLoading={signOutLoading} disabled={signOutLoading} title={"Sign Out"} onPress={signOut} />
      </View>
    </View>
  );
};

export default Chats;
