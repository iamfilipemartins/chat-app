import { View, Text, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useAuthContext } from "@/context/auth";
import { Ionicons } from "@expo/vector-icons";
import { isDoubleTap } from "@/utils";

interface Props {
  item: any;
  side: "left" | "right";
  last?: boolean;
  date: any;
}

const Message: React.FC<Props> = ({ item, side, last = false, date }) => {
  const { setLikeMessage, user } = useAuthContext();

  const lastTapTimeRef = useRef<any>(null);

  const handleTap = async () => {
    if (isDoubleTap(lastTapTimeRef) && item?.fromId !== user.userId) {
      await setLikeMessage(item?.messageId, item?.likedBy);
    }

    lastTapTimeRef.current = new Date().getTime();
  };

  const baseColor = side === "left" ? 'neutral' : 'emerald';
  const justifyContent = side === "left" ? 'start' : 'end';

  const containerClassname = `flex-row justify-${justifyContent} items-center mb-4 px-4 ${last && "mt-2"}`;
  const messageContainerClassname = `relative min-w-8 max-w-96 items-center p-2 rounded-xl bg-${baseColor}-100 border border-${baseColor}-200`;
  const likeClassName = `absolute z-50 -bottom-3 -${side}-3 rounded-full items-center justify-center bg-${baseColor}-200 p-0.5`;

  return (
    <View className={containerClassname}>
      <Pressable className={messageContainerClassname} onPress={handleTap}>
        <Text className="text-base max-w-96 min-w-8">{item?.message}</Text>
        <Text className="text-base max-w-96 text-xs self-end">
          {moment(date).format("HH:mm")}
        </Text>
        {!!item?.liked && <View className={likeClassName} >
          <Ionicons name={'heart'} size={16} color={'red'} />
          </View>}
      </Pressable>
    </View>
  );
};

export default Message;
