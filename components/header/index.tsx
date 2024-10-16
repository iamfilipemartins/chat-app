import { View, Text, Pressable } from "react-native";
import React from "react";
import { usePathname, useRouter } from "expo-router";
import { useAuthContext } from "@/context/auth";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  showPathname?: boolean;
  showUserEmail?: boolean;
}

const Header: React.FC<Props> = ({
  showPathname = true,
  showUserEmail = true,
}) => {
  const { user } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View className="flex-row justify-between pt-16 pb-4 px-4 bg-emerald-400 items-center">
      <View className="flex-row justify-between items-center">
        {router.canGoBack() && (
          <Pressable className="mr-4" onPress={() => router.back()}>
            <Ionicons name={"chevron-back-outline"} size={24} color={"white"} />
          </Pressable>
        )}
        {showPathname && (
          <Text
            style={{ fontSize: 24, textTransform: "capitalize" }}
            className="font-regular text-white"
          >
            {pathname.replace("/", "")}
          </Text>
        )}
      </View>

      {showUserEmail && (
        <Text style={{ fontSize: 16 }} className="font-regular text-white">
          {user?.email}
        </Text>
      )}
    </View>
  );
};

export default Header;
