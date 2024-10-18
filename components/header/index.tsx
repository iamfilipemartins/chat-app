import { View, Text, Pressable } from "react-native";
import React from "react";
import { usePathname, useRouter } from "expo-router";
import { useAuthContext } from "@/context/auth";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  showPathname?: boolean;
  showUserEmail?: boolean;
  userToChat?: any;
}

const Header: React.FC<Props> = ({
  showPathname = true,
  showUserEmail = true,
  userToChat,
}) => {
  const { user } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();

  if (userToChat) {
    return (
      <View className="flex-row justify-between pt-16 pb-4 px-4 bg-emerald-400 items-center border-b border-b-emerald-500">
        <View className="flex-row justify-between items-center">
          {router.canGoBack() && (
            <Pressable className="mr-4 " onPress={() => router.back()}>
              <Ionicons
                name={"chevron-back-outline"}
                size={24}
                color={"white"}
              />
            </Pressable>
          )}
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-white text-base"
          >
            {userToChat}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-row justify-between pt-16 pb-4 px-4 bg-emerald-400 items-center border-b border-b-emerald-500">
      <View className="flex-row justify-between items-center">
        {router.canGoBack() && (
          <Pressable className="mr-4 " onPress={() => router.back()}>
            <Ionicons name={"chevron-back-outline"} size={24} color={"white"} />
          </Pressable>
        )}
        {showPathname && (
          <Text
            style={{
              textTransform: "capitalize",
              fontFamily: "Inter_600SemiBold",
            }}
            className="text-2xl text-white"
          >
            {pathname.replace("/", "")}
          </Text>
        )}
      </View>

      {showUserEmail && (
        <Text
          style={{ fontFamily: "Inter_400Regular" }}
          className="text-base text-white"
        >
          {user?.email}
        </Text>
      )}
    </View>
  );
};

export default Header;
