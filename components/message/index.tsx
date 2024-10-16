import { View, Text } from "react-native";
import React from "react";

interface Props {
  description: string;
  side: "left" | "right";
  onPress?: () => void;
}

const Message: React.FC<Props> = ({ description, side, onPress }) => {
  return (
    <View>
      <Text className="bg-emerald-700">{description}</Text>
    </View>
  );
};

export default Message;
