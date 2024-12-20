import { View, Text, ActivityIndicator, Pressable } from "react-native";
import React from "react";
import lodash from "lodash";

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
  const handleOnPress = () => {
    !isLoading && onPress && onPress();
  };

  const onPressDebounced = lodash.debounce(handleOnPress, 1000, {
    leading: true,
    trailing: false,
  });

  return (

      <Pressable
        className={`${
          disabled
            ? "bg-gray-200 border border-gray-400"
            : "bg-emerald-400 border border-emerald-500"
        } rounded-xl justify-center items-center h-14 flex-1`}
        onPress={onPressDebounced}
        disabled={disabled}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={"white"} />
        ) : (
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className={`${disabled ? "text-gray-600" : "text-white"} text-xl`}
          >
            {title}
          </Text>
        )}
      </Pressable>
  );
};

export default Button;
