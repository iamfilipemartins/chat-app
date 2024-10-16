import { View, Text, TextInputProps, TextInput, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface InputProps extends TextInputProps {
  onChangeText: (value?: string) => void;
  placeholder?: string;
  editable?: boolean;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  valid?: boolean;
  rightIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  onChangeText,
  placeholder,
  editable,
  leftIconName,
  rightIconName,
  rightIconClick,
  valid,
  ...props
}) => {
  return (
    <View
      style={{ height: 56 }}
      className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-2xl"
    >
      {leftIconName && <Ionicons name={leftIconName} size={24} color={valid ? Colors.primary : 'gray'} /> }
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        editable={editable}
        selectTextOnFocus={editable}
        onChangeText={onChangeText}
        style={{ fontSize: 16 }}
        className="flex-1 font-semibold text-neutral-700"
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        {...props}
      />
      {rightIconName && rightIconClick  && (
        <Pressable onPress={rightIconClick}>
          <Ionicons name={rightIconName} size={24} color={'gray'} /> 
        </Pressable>
      )}

    </View>
  );
};

export default Input;
