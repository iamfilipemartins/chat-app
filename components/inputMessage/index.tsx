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
  innerRef?: any;
  sendPressColor?: string;
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
  backgroundColor = "bg-white",
  sendDisabled,
  borderColor = `border-emerald-400`,
  sendPressColor = `bg-emerald-400`,
  innerRef,
  ...props
}) => {
  return (
    <View
      className={`flex-row px-4 ${backgroundColor} items-center rounded-full h-14 border ${borderColor}`}
    >
      <TextInput
        style={{ fontFamily: "Inter_400Regular" }}
        ref={innerRef}
        autoCapitalize="none"
        autoCorrect={false}
        editable={editable}
        selectTextOnFocus={editable}
        onChangeText={onChangeText}
        className="flex-1 text-neutral-700 text-base"
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />

      {sendIconName && (
        <Pressable
          disabled={sendDisabled}
          className={`rounded-full items-center justify-center`}
          onPress={sendIconClick}
        >
          <Ionicons
            className={`py-2 pr-2 pl-2.5 rounded-full items-center justify-center bg-emerald-400`}
            name={sendIconName}
            size={20}
            color={sendIconColor}
          />
        </Pressable>
      )}
    </View>
  );
};

export default InputMessage;
