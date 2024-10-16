import { View, TextInputProps, TextInput, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  onChangeText: (value?: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  editable?: boolean;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  leftIconColor?: string;
  leftIconClick?: () => void;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  rightIconColor?: string;
  rightIconClick?: () => void;
  backgroundColor?: string;
  borderColor?: string;
}

const Input: React.FC<InputProps> = ({
  onChangeText,
  placeholder,
  placeholderTextColor = "gray",
  editable,
  leftIconName,
  leftIconColor = "gray",
  leftIconClick = () => {},
  rightIconName,
  rightIconColor = "gray",
  rightIconClick = () => {},
  backgroundColor = 'bg-neutral-200',
  borderColor = 'border-neutral-300',
  ...props
}) => {
  return (
    <View className={`flex-row gap-4 px-4 ${backgroundColor} items-center rounded-2xl h-14 border ${borderColor}`}>
      {leftIconName  && (
        <Pressable onPress={leftIconClick}>
          <Ionicons
            name={leftIconName}
            size={24}
            color={leftIconColor}
          />
        </Pressable>
      )}

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        editable={editable}
        selectTextOnFocus={editable}
        onChangeText={onChangeText}
        style={{ fontSize: 16, fontWeight: 'regular' }}
        className="flex-1 font-semibold text-neutral-700"
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />

      {rightIconName && (
        <Pressable onPress={rightIconClick}>
          <Ionicons name={rightIconName} size={24} color={rightIconColor} />
        </Pressable>
      )}
    </View>
  );
};

export default Input;
