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
      style={{ height: 56 }}
      className={`${
        disabled ? "bg-gray-200" : "bg-emerald-400"
      } flex-row items-center rounded-2xl justify-center w-full`}
    >
      <Pressable
        className={`${
          disabled ? "bg-gray-200" : "bg-emerald-400"
        } rounded-xl justify-center items-center w-full`}
        style={{ height: 56 }}
        onPress={onPress}
        disabled={disabled}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text
            style={{ fontSize: 24 }}
            className={`font-bold ${
              disabled ? "text-emerald-400" : "text-white"
            }`}
          >
            {title}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default Button;
