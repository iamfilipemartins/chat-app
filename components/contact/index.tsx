import { Colors } from "@/constants/Colors";
import { useAuthContext } from "@/context/auth";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import moment from "moment";
import { getChatId } from "@/utils";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface Props {
  contact: any;
  onPress?: () => void;
  firstContact: boolean;
}

const Contact: React.FC<Props> = ({ contact, onPress, firstContact }) => {
  const [lastMessage, setLastMessage] = useState<any>(undefined);
  const [lastMessageDate, setLastMessageDate] = useState<any>(undefined);
  const { user } = useAuthContext();

  useEffect(() => {
    const chatId = getChatId(user?.userId, contact?.userId);

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
    !!lastMessage?.fromId && lastMessage?.fromId !== user?.userId;

  const hasLastMessage = !!lastMessage?.message;

  const borderColor = hasLastMessage
    ? lastMessageFromContact
      ? "border-orange-300"
      : "border-emerald-300"
    : "border-neutral-300";

  const marginItem = firstContact ? "mt-4 mx-4 mb-2" : "my-2 mx-4";
  const containerClassname = `h-24 rounded-2xl bg-neutral-100 border ${borderColor} ${marginItem}`;

  const iconColor = hasLastMessage
    ? lastMessageFromContact
      ? Colors.alert
      : Colors.primary
    : "gray";

  const iconName =
    hasLastMessage && !lastMessageFromContact
      ? "checkmark-done-outline"
      : "chevron-forward-outline";

  const content = (
    <>
      <View className="justify-between items-start">
        {contact?.email && (
          <Text className="text-base font-medium mb-2">{contact?.email}</Text>
        )}
        {!!lastMessage && (
          <Text className="text-sm font-regular">
            {lastMessage?.message || "Start a new chat with me!"}
          </Text>
        )}
      </View>

      <View className="flex-row justify-between items-center">
        {lastMessageDate && (
          <Text className="text-sm font-regular mr-4">{lastMessageDate}</Text>
        )}

        <Ionicons name={iconName} size={16} color={iconColor} />
      </View>
    </>
  );

  return (
    <View className={containerClassname}>
      {onPress && (
        <Pressable
          className="flex-row justify-between items-center p-4"
          onPress={onPress}
        >
          {content}
        </Pressable>
      )}

      {!onPress && <>{content}</>}
    </View>
  );
};

export default Contact;
