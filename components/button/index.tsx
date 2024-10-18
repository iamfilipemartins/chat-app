import { View, Text, ActivityIndicator, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface ButtonProps {
  title?: string;
  onPress: () => void;
  color?: string;
  titleColor?: string;
  disabled?: boolean;
  isLoading?: boolean;
  iconName?: string;
  iconColor?: string;
  size?: number;
  elevation?: number;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  isLoading,
  disabled,
}) => {
  return (
    <View
      className={`${
        disabled ? "bg-gray-200" : "bg-emerald-400"
      } flex-row items-center rounded-2xl justify-center w-full h-14`}
    >
      <Pressable
        className={`${
          disabled
            ? "bg-gray-200 border border-gray-400"
            : "bg-emerald-400 border border-emerald-500"
        } rounded-xl justify-center items-center w-full h-14`}
        onPress={onPress}
        disabled={disabled}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text
            className={`font-bold ${
              disabled ? "text-gray-500" : "text-white"
            } text-xl`}
          >
            {title}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default Button;
