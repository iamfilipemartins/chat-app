import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import lodash from "lodash";
import moment from "moment";
import { useAuthContext } from "@/context/auth";

interface Props {
  chat?: any;
  onPress?: () => void;
  last: boolean;
  chatUser: any;
}

const ChatItem: React.FC<Props> = ({ chatUser, onPress, last, chat }) => {
  const { user } = useAuthContext();

  const lastMessageFromContact = chat?.lastMessageUserId !== user?.userId;
  const hasLastMessage = !!chat?.lastMessage;
  const borderColor = !!hasLastMessage
    ? lastMessageFromContact
      ? " border border-orange-300"
      : " border border-emerald-300"
    : " border border-neutral-300";

  let containerClassname = "pt-4 px-4";

  if (last) {
    containerClassname = containerClassname.concat(" pb-4");
  }

  let contactClassname = `h-24 rounded-2xl bg-neutral-100 flex-row justify-between items-center p-4 ${borderColor}`;

  const iconColor = hasLastMessage
    ? lastMessageFromContact
      ? Colors.alert
      : Colors.primary
    : "gray";

  const iconName =
    hasLastMessage && !lastMessageFromContact
      ? "checkmark-done-outline"
      : "chevron-forward-outline";

  const handleOnPress = () => {
    onPress && onPress();
  };

  const onPressDebounced = lodash.debounce(handleOnPress, 1000, {
    leading: true,
    trailing: false,
  });

  return (
    <Pressable className={containerClassname}>
      <Pressable className={contactClassname} onPress={onPressDebounced}>
        <View className="justify-between items-start">
          {chatUser?.email && (
            <Text
              style={{ fontFamily: "Inter_500Medium" }}
              className="text-m text-black mb-2"
            >
              {chatUser?.email}
            </Text>
          )}

          {chat?.isLastMessageText && (
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="text-sm text-gray-600"
            >
              {chat?.lastMessage || "Start a new chat with me!"}
            </Text>
          )}

          {chat?.isLastMessageImage && (
            <View className="flex-row justify-between items-center">
              <Ionicons
                className={`rounded-full items-center justify-center mr-2`}
                name={"image-outline"}
                size={20}
                color={Colors.gray600}
              />
              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-sm text-gray-600"
              >
                Photo
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row justify-between items-center">
          {chat?.lastMessageTime && (
            <Text
              style={{ fontFamily: "Inter_300Light" }}
              className="text-sm text-gray-600 mr-4"
            >
              {moment(new Date(chat?.lastMessageTime * 1000)).calendar()}
            </Text>
          )}

          <Ionicons name={iconName} size={16} color={iconColor} />
        </View>
      </Pressable>
    </Pressable>
  );
};

export default ChatItem;
