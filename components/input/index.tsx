import { View, Text, TextInputProps, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface InputProps extends TextInputProps {
  value?: string;
  onChangeText: (value?: string) => void;
  innerRef?: any;
  placeholder?: string;
  editable?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  innerRef,
  placeholder,
  editable,
}) => {
  return (
    <View
      style={{ height: 56 }}
      className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
    >
      <Ionicons name="person-outline" size={24} color={Colors.primary} />
      <TextInput editable={editable} selectTextOnFocus={editable} ref={innerRef} value={value} onChangeText={onChangeText} style={{ fontSize: 16 }} className="flex-1 font-semibold text-neutral-700" placeholder={placeholder} placeholderTextColor={'gray'} />
    </View>
  );
};

export default Input;
