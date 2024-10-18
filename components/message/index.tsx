import { View, Text, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useAuthContext } from "@/context/auth";
import { Ionicons } from "@expo/vector-icons";
import { isDoubleTap } from "@/utils";

interface Props {
  item: any;
  date: any;
}

const Message: React.FC<Props> = ({ item, date }) => {
  const { setLikeMessage, user } = useAuthContext();

  const lastTapTimeRef = useRef<any>(null);

  const handleTap = async () => {
    if (isDoubleTap(lastTapTimeRef)) {
      await setLikeMessage(item?.messageId, item?.likedBy);
      lastTapTimeRef.current = null;
    } else {
      lastTapTimeRef.current = new Date().getTime();
    }
  };

  const containerClassname =
    item?.toId === user?.userId
      ? "flex-row justify-start items-center my-2 px-4 min-h-8"
      : "flex-row justify-end items-center my-2 px-4 min-h-8";

  const messageContainerClassname =
    item?.toId === user?.userId
      ? `relative min-w-8 max-w-96 items-center p-2 rounded-xl bg-neutral-100 border border-neutral-200`
      : `relative min-w-8 max-w-96 items-center p-2 rounded-xl bg-emerald-100 border border-emerald-200`;

  const likeClassName =
    item?.toId === user?.userId
      ? `absolute z-50 -bottom-2 -right-3 rounded-full items-center justify-center bg-neutral-200 p-0.5`
      : `absolute z-50 -bottom-2 -left-3 rounded-full items-center justify-center bg-emerald-200 p-0.5`;

  return (
    <View className={containerClassname}>
      <Pressable
        className={messageContainerClassname}
        onPress={item?.fromId !== user.userId ? handleTap : undefined}
      >
        <Text className="text-base max-w-96 min-w-12">{item?.message}</Text>
        <Text className="text-base max-w-96 text-xs self-end">
          {moment(date).format("HH:mm")}
        </Text>
        {!!item?.liked && (
          <View className={likeClassName}>
            <Ionicons name={"heart"} size={12} color={"red"} />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default Message;
