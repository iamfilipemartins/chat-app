import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  title: string;
  description: string;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  rightText?: string;
  onPress?: () => void;
  lastContact:boolean;
}

const Contact: React.FC<Props> = ({
  title,
  description,
  leftIconName,
  rightIconName,
  rightText,
  lastContact,
  onPress
}) => {
  const content = (
    <>
      {leftIconName && (
        <View>
          <Ionicons name={leftIconName} size={24} color={Colors.primary} />
        </View>
      )}

      <View className="justify-between items-start">
        {title && <Text style={{ fontSize: 16}} className="font-medium mb-2">{title}</Text>}
        {description && <Text style={{ fontSize: 12 }} className="font-regular">{description}</Text>}
      </View>

      {(rightIconName || rightText) && (
        <View className="flex-row justify-between items-center">
          {rightText && <Text style={{ fontSize: 12 }} className="font-regular mr-4">{rightText}</Text>}
          {rightIconName && <Ionicons name={rightIconName} size={16} color={Colors.primary} />}
        </View>
      )}
    </>
  );

  return (
    <View style={{ height: 80 }} className={`${!lastContact && 'border-b border-b-emerald-400'}`}>
      {onPress && (
        <Pressable className='flex-row justify-between items-center p-4' onPress={onPress}>
          {content}
        </Pressable>
      )}

      {!onPress && <>{content}</>}
    </View>
  );
};

export default Contact;
