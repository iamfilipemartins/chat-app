import { Colors } from "@/constants/Colors";
import { useAuthContext } from "@/context/auth";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import moment from "moment";
import { getChatId } from "@/utils";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import lodash from "lodash";

interface Props {
  chat: any;
  onPress?: () => void;
  last: boolean;
  chatUser: any;
}

const ChatItem: React.FC<Props> = ({ chat, chatUser, onPress, last }) => {
  const [lastMessage, setLastMessage] = useState<any>(undefined);
  const [lastMessageDate, setLastMessageDate] = useState<any>(undefined);
  const { user } = useAuthContext();

  useEffect(() => {
    const chatId = getChatId(user?.userId, chatUser?.userId);

    const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId),
      orderBy("chatId", "desc"),
    );

    let unsub = onSnapshot(q, (snap) => {
      let messages = snap.docs.map((item: any) => item.data());
      const message = { ...messages[0] };
      setLastMessage(message);

      if (message?.createdAt?.seconds) {
        setLastMessageDate(
          moment(new Date(message?.createdAt?.seconds * 1000)).calendar(),
        );
      } else {
        setLastMessageDate(undefined);
      }
    });

    return unsub;
  }, []);

  const lastMessageFromContact =
    !!lastMessage?.fromId && lastMessage?.fromId === chatUser?.userId;

  const hasLastMessage = !!lastMessage?.message || !!lastMessage?.image;

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

          {!!lastMessage && !lastMessage?.image && (
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="text-sm text-gray-600"
            >
              {lastMessage?.message || "Start a new chat with me!"}
            </Text>
          )}

          {!!lastMessage && lastMessage?.image && (
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
          {lastMessageDate && (
            <Text
              style={{ fontFamily: "Inter_300Light" }}
              className="text-sm text-gray-600 mr-4"
            >
              {lastMessageDate}
            </Text>
          )}

          <Ionicons name={iconName} size={16} color={iconColor} />
        </View>
      </Pressable>
    </Pressable>
  );
};

export default ChatItem;
