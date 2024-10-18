import { View, Text, Pressable } from "react-native";
import React, { useRef } from "react";
import moment from "moment";
import { useAuthContext } from "@/context/auth";
import { Ionicons } from "@expo/vector-icons";
import { isDoubleTap } from "@/utils";

interface Props {
  item: any;
  date: any;
  first?: boolean;
}

const Message: React.FC<Props> = ({ item, date, first }) => {
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

  let containerClassname =
    item?.toId === user?.userId
      ? "z-30 flex-row justify-start items-center pt-4 px-3 min-h-8"
      : "z-30 flex-row justify-end items-center pt-4 px-3 min-h-8";

  if (first) {
    containerClassname = containerClassname.concat(" pb-4");
  }

  const messageContainerClassname =
    item?.toId === user?.userId
      ? `z-30 relative min-w-8 max-w-96 items-center py-1 px-2 rounded-xl bg-neutral-200 border border-neutral-200`
      : `z-30 relative min-w-8 max-w-96 items-center py-1 px-2 rounded-xl bg-emerald-200 border border-emerald-200`;

  const likeClassName =
    item?.toId === user?.userId
      ? `absolute z-50 -bottom-1.5 -right-3 rounded-full items-center justify-center bg-neutral-200 p-0.5`
      : `absolute z-50 -bottom-1.5 -left-3 rounded-full items-center justify-center bg-emerald-200 p-0.5`;

  const bubbleClassName =
    item?.toId === user?.userId
      ? `absolute z-0 -bottom-0 -left-2.5 rounded-full items-center justify-center border-r-[6px] border-neutral-200 w-4 h-4`
      : `absolute z-0 -bottom-0 -right-2.5 rounded-full items-center justify-center border-l-[6px] border-emerald-200 w-4 h-4`;

  return (
    <Pressable className={containerClassname}>
      <Pressable
        className={messageContainerClassname}
        onPress={item?.fromId !== user.userId ? handleTap : undefined}
      >
        <Text
          style={{ fontFamily: "Inter_400Regular" }}
          className="text-base max-w-96 min-w-12"
        >
          {item?.message}
        </Text>
        <Text
          style={{ fontFamily: "Inter_300Light" }}
          className="text-base max-w-96 text-xs self-end"
        >
          {moment(date).format("HH:mm")}
        </Text>
        {!!item?.liked && (
          <View className={likeClassName}>
            <Ionicons name={"heart"} size={12} color={"red"} />
          </View>
        )}
        <View
          className={bubbleClassName}
          style={{
            transform: [
              { rotate: item?.toId === user?.userId ? "40deg" : "-40deg" },
            ],
          }}
        />
      </Pressable>
    </Pressable>
  );
};

export default Message;
