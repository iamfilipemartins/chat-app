import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import lodash from "lodash";

interface Props {
  contact: any;
  onPress?: () => void;
  last: boolean;
}

const Contact: React.FC<Props> = ({ contact, onPress, last }) => {
  const handleOnPress = () => {
    onPress && onPress();
  };

  const onPressDebounced = lodash.debounce(handleOnPress, 1000, {
    leading: true,
    trailing: false,
  });

  return (
    <Pressable className={`pt-4 px-4 ${last && "pb-4"}`}>
      <Pressable
        className={
          "h-24 rounded-2xl bg-neutral-100 flex-row justify-between items-center p-4 border border-neutral-300"
        }
        onPress={onPressDebounced}
      >
        <View className="justify-between items-start">
          {contact?.email && (
            <Text
              style={{ fontFamily: "Inter_500Medium" }}
              className="text-m text-black mb-2"
            >
              {contact?.email}
            </Text>
          )}
        </View>

        <View className="flex-row justify-between items-center">
          <Ionicons name={"chevron-forward-outline"} size={16} color={"gray"} />
        </View>
      </Pressable>
    </Pressable>
  );
};

export default Contact;
