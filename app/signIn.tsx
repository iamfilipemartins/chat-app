import { View, Text, SafeAreaView, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Input from "@/components/input";
import Button from "@/components/button";
import KeyboardView from "@/components/keyboardView";

const signIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const usernameRef = useRef<string | undefined>("");
  
  const handleChangeUsername = (value: string | undefined) => {
    usernameRef.current = value;
  };

  const handlePressJoin = () => {
    if(!usernameRef.current){
      Alert.alert('Hey!', "Please remember to fill your username before join the chat..");
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardView>
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
              onChangeText={handleChangeUsername}
            />
            <Button isLoading={loading} title="Join" onPress={handlePressJoin}/>
          </View>
        </View>
      </KeyboardView>
    </SafeAreaView>
  );
};

export default signIn;
