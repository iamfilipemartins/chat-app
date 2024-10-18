import { View, Text } from "react-native";
import React from "react";
import moment from "moment";

interface Props {
  description: string;
  side: "left" | "right";
  onPress?: () => void;
  last?: boolean;
  date: any;
}

const Message: React.FC<Props> = ({
  description,
  side,
  onPress,
  last = false,
  date
}) => {

  const containerClassname =
    side === "left"
      ? `flex-row justify-start items-center mb-2 px-4 ${last && "mt-2"}`
      : `flex-row justify-end items-center mb-2 px-4 ${last && "mt-2"}`;

  const messageContainerClassname =
    side === "left"
      ? "min-w-8 max-w-96 items-center p-2 rounded-xl bg-neutral-50 border border-neutral-200"
      : "min-w-8 max-w-96 items-center p-2 rounded-xl bg-emerald-50 border border-emerald-200";

  return (
    <View className={containerClassname}>
      <View className={messageContainerClassname}>
        <Text className="text-base max-w-96 min-w-8">{description}</Text>
        <Text className="text-base max-w-96 text-xs self-end">{moment(date).format('HH:mm')}</Text>
      </View>
    </View>
  );
};

export default Message;
