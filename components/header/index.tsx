import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/context/auth";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  showPathname?: boolean;
  showContacts?: boolean;
  showChats?: boolean;
  showUsername?: boolean;
  userToChat?: any;
}

const Header: React.FC<Props> = ({
  showUsername = true,
  userToChat,
  showContacts = false,
  showChats = false,
}) => {
  const { handleSignOut, user } = useAuthContext();
  const router = useRouter();
  const [signOutLoading, setSignOutLoading] = useState<boolean>(false);

  const signOut = async () => {
    setSignOutLoading(true);
    await handleSignOut();
    setSignOutLoading(false);
  };

  if (userToChat) {
    return (
      <View className="flex-row justify-between pt-16 pb-4 px-4 bg-emerald-400 items-center border-b border-b-emerald-500">
        <View className="flex-row justify-between items-center">
          <Pressable className="mr-4 " onPress={() => router.replace("chats")}>
            <Ionicons name={"chevron-back-outline"} size={24} color={"white"} />
          </Pressable>

          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-white self-center"
          >
            {userToChat}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-row justify-between pt-12 pb-4 px-4 bg-emerald-400 items-center border-b border-b-emerald-500">
      <View className="flex-row justify-between items-center">
        {showContacts && (
          <Pressable
            className="mr-4 "
            onPress={() => router.replace("contacts")}
          >
            <Ionicons name={"people-outline"} size={24} color={"white"} />
          </Pressable>
        )}

        {showChats && (
          <Pressable className="mr-4 " onPress={() => router.replace("chats")}>
            <Ionicons name={"chatbubbles-outline"} size={24} color={"white"} />
          </Pressable>
        )}
      </View>

      {showUsername && (
        <Text
          style={{ fontFamily: "Inter_400Regular" }}
          className="text-white self-center"
        >
          {user?.username}
        </Text>
      )}

      {signOutLoading && (
        <ActivityIndicator className="h-6 w-6" size={"small"} color={"white"} />
      )}

      {!signOutLoading && (
        <Pressable
          disabled={signOutLoading}
          className="self-end h-6 w-6"
          onPress={signOut}
        >
          <Ionicons name={"log-out-outline"} size={24} color={"white"} />
        </Pressable>
      )}
    </View>
  );
};

export default Header;
