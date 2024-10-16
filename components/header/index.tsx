import { View, Text } from "react-native";
import React from "react";
import { usePathname } from "expo-router";
import { useAuthContext } from "@/context/auth";

interface Props {
  showPathname?: boolean;
}

const Header: React.FC<Props> = ({ showPathname = true }) => {
  const { user } = useAuthContext();
  const pathname = usePathname();

  return (
    <View className="flex-row justify-between pt-16 pb-4 px-4 bg-emerald-400 items-center">
      {showPathname && (
        <Text style={{ fontSize: 24, textTransform: 'capitalize' }} className="font-regular text-white">
          {pathname.replace("/", "")}
        </Text>
      )}
      <Text style={{ fontSize: 16 }} className="font-regular text-white">
        {user?.email}
      </Text>
    </View>
  );
};

export default Header;
