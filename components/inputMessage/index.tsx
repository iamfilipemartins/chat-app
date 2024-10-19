import { View, TextInputProps, TextInput, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface InputProps extends TextInputProps {
  onChangeText: (value?: string) => void;
  placeholder?: string;
  editable?: boolean;
  onPressPhotos: () => void;
  onPressCamera: () => void;
  onPressSend: () => void;
  sendDisabled?: boolean;
  innerRef?: any;
}

const InputMessage: React.FC<InputProps> = ({
  onChangeText,
  placeholder = "Type your message",
  editable,
  onPressPhotos = () => {},
  onPressCamera = () => {},
  onPressSend = () => {},
  sendDisabled,
  innerRef,
  ...props
}) => {
  return (
    <View
      className={`flex-row px-2 bg-emerald-50 items-center rounded-full min-h-14 max-h-28`}
    >
      <Pressable
        className={`rounded-full items-center justify-center`}
        onPress={onPressPhotos}
      >
        <Ionicons
          className={`rounded-full items-center justify-center`}
          name={"image-outline"}
          size={20}
          color={Colors.primary}
        />
      </Pressable>

      <View
        className={`flex-row flex-1 mx-4 my-2 p-2 bg-white items-center rounded-xl border border-emerald-400`}
      >
        <TextInput
          style={{ fontFamily: "Inter_400Regular" }}
          ref={innerRef}
          autoCapitalize="none"
          autoCorrect={false}
          editable={editable}
          selectTextOnFocus={editable}
          onChangeText={onChangeText}
          className="flex-1 text-neutral-700"
          placeholder={placeholder}
          placeholderTextColor={Colors.gray400}
          multiline={true}
          {...props}
        />
      </View>

      <Pressable
        className={`rounded-full items-center justify-center mr-4`}
        onPress={onPressCamera}
      >
        <Ionicons
          className={`rounded-full items-center justify-center`}
          name={"camera-outline"}
          size={20}
          color={Colors.primary}
        />
      </Pressable>

      <Pressable
        disabled={sendDisabled}
        className={`rounded-full items-center justify-center`}
        onPress={onPressSend}
      >
        <Ionicons
          className={`py-2 pr-2 pl-2.5 rounded-full items-center justify-center bg-emerald-400`}
          name={"send-outline"}
          size={20}
          color={"white"}
        />
      </Pressable>
    </View>
  );
};

export default InputMessage;
