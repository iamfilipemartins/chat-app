import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  title?: string;
  description?: string;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

const Contact: React.FC<Props> = ({
  title,
  description,
  leftIconName,
  rightIconName,
  onPress,
  ...props
}) => {
  const content = (
    <>
      {leftIconName && (
        <View>
          <Ionicons name={leftIconName} size={24} color={Colors.primary} />
        </View>
      )}

      <View>
        {title && <Text>{title}</Text>}
        {description && <Text>{description}</Text>}
      </View>

      {rightIconName && (
        <View>
          <Ionicons name={rightIconName} size={24} color={Colors.primary} />
        </View>
      )}
    </>
  );

  return (
    <View {...props}>
      {onPress && (
        <Pressable onPress={onPress}>
          {content}
        </Pressable>
      )}

      {!onPress && <>{content}</>}
    </View>
  );
};

export default Contact;
