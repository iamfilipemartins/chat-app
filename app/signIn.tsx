import { View, Text, SafeAreaView, Alert, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Input from "@/components/input";
import Button from "@/components/button";
import KeyboardView from "@/components/keyboardView";
import { useAuthContext } from "@/context/auth";
import { isValidEmail } from "@/utils";

const signIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const emailRef = useRef<string | undefined>("");
  const { handleSignIn } = useAuthContext();

  const handleChangeEmail = (value: string | undefined) => {
    setDisabled(loading || !isValidEmail(value));
    emailRef.current = value;
  };

  const handlePressJoin = async () => {
    setLoading(true);

    if (!emailRef.current) {
      Alert.alert(
        "Hey!",
        "Please remember to fill your email before join the chat."
      );
    } else {
      try{
        await handleSignIn(emailRef.current);
      } catch (e: any){
        Alert.alert(
          "Sorry",
          "We have some issues with your attempt to join our chat. Try again later."
        );
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    setDisabled(disabled || loading);
  }, [loading]);

  return (
    <SafeAreaView className="flex-1">
      <KeyboardView>
        <StatusBar style="dark" />
        <View className="flex-1 items-center justify-center p-8">
          <View className="flex-1 items-center justify-center">
            <Image
              style={{ height: 160 }}
              resizeMode="contain"
              source={require("../assets/images/logo.png")}
            />
          </View>
          <View className="flex-1 items-center justify-start gap-4">
            <Input
              editable={!loading}
              placeholder="E-mail"
              onChangeText={handleChangeEmail}
              keyboardType="email-address"
            />
            <Button
              isLoading={loading}
              title="Join"
              onPress={handlePressJoin}
              disabled={disabled}
            />
          </View>
        </View>
      </KeyboardView>
    </SafeAreaView>
  );
};

export default signIn;
