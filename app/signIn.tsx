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
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const emailRef = useRef<any>("");
  const passwordRef = useRef<any>("");

  const { handleSignIn } = useAuthContext();

  const handleChangeEmail = (value: string | undefined) => {
    setEmailValid(isValidEmail(value));
    emailRef.current = value;
  };

  const handleChangePassword = (value: string | undefined) => {
    setPasswordValid(!!value?.length);
    passwordRef.current = value;
  };

  const handlePressJoin = async () => {
    console.log("handlePressJoin");
    setLoading(true);

    if (emailRef?.current && passwordRef?.current) {
      try {
        const response: any = await handleSignIn(emailRef.current, passwordRef?.current);
        if(!response?.success){
          Alert.alert(
            "Something went wrong!",
            "This email is already in use. Check your params and try again later."
          );
        }
      } catch (e: any) {
        Alert.alert(
          "Something went wrong!",
          "We have some issues with your attempt to join our chat. Try again later."
        );
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    setDisabled(!emailValid || !passwordValid);
  }, [emailValid, passwordValid]);

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
              leftIconName="mail-outline"
              valid={emailValid}
            />
            <Input
              editable={!loading}
              placeholder="Password"
              onChangeText={handleChangePassword}
              leftIconName="key-outline"
              secureTextEntry={hidePassword}
              autoCapitalize="none"
              autoCorrect={false}
              valid={passwordValid}
              rightIconName={hidePassword ? "eye-outline" : "eye-off-outline"}
              rightIconClick={() => setHidePassword(!hidePassword)}
            />
            <Button
              isLoading={loading}
              title="Join"
              onPress={handlePressJoin}
              disabled={disabled || loading}
            />
          </View>
        </View>
      </KeyboardView>
    </SafeAreaView>
  );
};

export default signIn;
