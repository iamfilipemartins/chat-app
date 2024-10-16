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
  sendIconName?: keyof typeof Ionicons.glyphMap;
  sendIconColor?: string;
  sendIconClick?: () => void;
  backgroundColor?: string;
  borderColor?: string;
  sendDisabled?: boolean;
}

const InputMessage: React.FC<InputProps> = ({
  onChangeText,
  placeholder = "Type your message",
  placeholderTextColor = "gray",
  editable,
  leftIconName,
  leftIconColor = "gray",
  leftIconClick = () => {},
  sendIconName = "send-outline",
  sendIconColor = "white",
  sendIconClick = () => {},
  backgroundColor = 'bg-white',
  sendDisabled,
  borderColor = `border-${sendDisabled ? 'gray' : 'emerald'}-400`,
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

      {sendIconName && (
        <Pressable disabled={sendDisabled} className={`bg-${sendDisabled ? 'gray' : 'emerald'}-400 p-2 rounded-full`} onPress={sendIconClick}>
          <Ionicons name={sendIconName} size={20} color={sendIconColor} />
        </Pressable>
      )}
    </View>
  );
};

export default InputMessage;
