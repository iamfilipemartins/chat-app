import { View, Text, SafeAreaView } from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Input from "@/components/input";
import Button from "@/components/button";

const signIn: React.FC = () => {
  const [username, setUsername] = useState<string | undefined>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const usernameRef = useRef("");
  
  const handleChangeUsername = (value: string | undefined) => {
    setDisabled(!value || value?.length <= 3);
    setUsername(value);
  };

  const handlePressJoin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <StatusBar style="dark" />
        <View className="flex-1 gap-12 items-center justify-center p-8">
        <View className="flex-1 items-center justify-center">
          <Text
            style={{ fontSize: 24 }}
            className="font-bold text-center text-emerald-400"
          >
            {`Welcome and\nChat Me!`}
          </Text>
          </View>
          <View className="flex-1 items-center justify-start gap-4">
            <Input
              editable={!loading}
              placeholder="Username"
              value={username}
              onChangeText={handleChangeUsername}
            />
            <Button isLoading={loading} title="Join" disabled={disabled} onPress={handlePressJoin}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default signIn;
