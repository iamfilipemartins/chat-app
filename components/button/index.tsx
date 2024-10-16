import { View, Text, ActivityIndicator, Pressable } from "react-native";
import React from "react";

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
  disabled,
  title,
  onPress,
  isLoading,
}) => {
  return (
    <View
      style={{ height: 56 }}
      className={
        disabled
          ? "bg-gray-200 flex-row items-center rounded-2xl justify-center w-full"
          : "bg-emerald-400 flex-row items-center rounded-2xl justify-center w-full"
      }
    >
      <Pressable
        className={
          disabled
            ? "bg-gray-200 rounded-xl justify-center items-center w-full"
            : "bg-emerald-400 rounded-xl justify-center items-center w-full"
        }
        style={{ height: 56 }}
        onPress={onPress}
        disabled={disabled}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={'white'} />
        ) : (
          <Text
            style={{ fontSize: 24 }}
            className="font-bold text-white"
          >
            {title}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default Button;
