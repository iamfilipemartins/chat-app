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
      ? "z-30 flex-row justify-start items-center py-2 px-4 min-h-8"
      : "z-30 flex-row justify-end items-center py-2 px-4 min-h-8";

  const messageContainerClassname =
    item?.toId === user?.userId
      ? `z-30 relative min-w-8 max-w-96 items-center p-2 rounded-xl bg-neutral-200 border border-neutral-200`
      : `z-30 relative min-w-8 max-w-96 items-center p-2 rounded-xl bg-emerald-200 border border-emerald-200`;

  const likeClassName =
    item?.toId === user?.userId
      ? `absolute z-50 -bottom-2 -right-3 rounded-full items-center justify-center bg-neutral-200 p-0.5`
      : `absolute z-50 -bottom-2 -left-3 rounded-full items-center justify-center bg-emerald-200 p-0.5`;

  const bubbleClassName =
    item?.toId === user?.userId
      ? `absolute z-0 -bottom-1 -left-3 rounded-full items-center justify-center border-r-[6px] border-neutral-200 w-4 h-4`
      : `absolute z-0 -bottom-1 -right-3 rounded-full items-center justify-center border-l-[6px] border-emerald-200 w-4 h-4`;

  return (
    <Pressable className={containerClassname}>
      <Pressable
        className={messageContainerClassname}
        onPress={item?.fromId !== user.userId ? handleTap : undefined}
      >
        <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-base max-w-96 min-w-12">{item?.message}</Text>
        <Text style={{ fontFamily: 'Inter_300Light' }} className="text-base max-w-96 text-xs self-end">
          {moment(date).format("HH:mm")}
        </Text>
        {!!item?.liked && (
          <View className={likeClassName}>
            <Ionicons name={"heart"} size={12} color={"red"} />
          </View>
        )}
         <View className={bubbleClassName} style={{transform: [{ rotate: item?.toId === user?.userId ? '45deg' : '-45deg'}]}} />
      </Pressable>
    </Pressable>
  );
};

export default Message;
