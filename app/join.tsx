import { View, SafeAreaView, Alert, Image, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Input from "@/components/input";
import Button from "@/components/button";
import KeyboardView from "@/components/keyboardView";
import { useAuthContext } from "@/context/auth";
import { isValidEmail } from "@/utils";
import { Colors } from "@/constants/Colors";

const Join: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isJoin, setIsJoin] = useState<boolean>(true);
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [usernameValid, setUsernameValid] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const usernameRef = useRef<any>("");
  const emailRef = useRef<any>("");
  const passwordRef = useRef<any>("");

  const { handleSignIn } = useAuthContext();

  const handleChangeUsername = (value: string | undefined) => {
    setUsernameValid(!!value && value?.length >= 2);
    usernameRef.current = value;
  };

  const handleChangeEmail = (value: string | undefined) => {
    setEmailValid(isValidEmail(value));
    emailRef.current = value;
  };

  const handleChangePassword = (value: string | undefined) => {
    setPasswordValid(!!value && value?.length >= 6);
    passwordRef.current = value;
  };

  const handlePressJoin = async () => {
    setLoading(true);

    if (usernameRef?.current && emailRef?.current && passwordRef?.current) {
      try {
        const response: any = await handleSignIn(
          emailRef.current,
          passwordRef?.current,
          usernameRef?.current
        );
        if (!response?.success) {
          Alert.alert(
            "Something went wrong!",
            "Please check your params and try again."
          );
        }
      } catch (_e) {
        Alert.alert(
          "Something went wrong!",
          "We have some issues with your attempt to join our chat. Please try again."
        );
      }
    } else {
      Alert.alert(
        "Something went wrong!",
        "Please check your params and try again."
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isJoin) {
      setDisabled(!emailValid || !passwordValid);
    } else {
      setDisabled(!usernameValid || !emailValid || !passwordValid);
    }
  }, [usernameValid, emailValid, passwordValid]);

  useEffect(() => {
    usernameRef.current = null;
    emailRef.current = null;
    passwordRef.current = null;
    setUsernameValid(false);
    setEmailValid(false);
    setPasswordValid(false);
  }, [isJoin]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardView>
        <StatusBar style="dark" />
        <View className="flex-1 items-center justify-center p-4 w-full">
          <View className="flex-1 items-center justify-center">
            <Image
              style={{ height: 160 }}
              resizeMode="contain"
              source={require("../assets/images/logo.png")}
            />
          </View>
          <View className="flex-1 items-center justify-start gap-4">
            {isJoin && (
              <View className="flex-1 items-center justify-start gap-4">
                <Text style={{ fontFamily: "Inter_400Regular" }}>
                  Add your info to access your chats:
                </Text>
                <Input
                  editable={!loading}
                  placeholder={"Email"}
                  onChangeText={handleChangeEmail}
                  keyboardType="email-address"
                  leftIconName="mail-outline"
                  leftIconColor={emailValid ? Colors.primary : undefined}
                  borderColor={emailValid ? "border-emerald-400" : undefined}
                />
                <Input
                  editable={!loading}
                  placeholder={"Password (at least 6 characters)"}
                  onChangeText={handleChangePassword}
                  leftIconName="key-outline"
                  secureTextEntry={hidePassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  leftIconColor={passwordValid ? Colors.primary : undefined}
                  rightIconName={
                    hidePassword ? "eye-outline" : "eye-off-outline"
                  }
                  rightIconClick={() => setHidePassword(!hidePassword)}
                  borderColor={passwordValid ? "border-emerald-400" : undefined}
                />
                <Text
                  className="text-center"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Don't have an account?
                  <Text
                    onPress={() => setIsJoin(!isJoin)}
                    className="text-blue-500"
                    style={{ fontFamily: "Inter_500Medium" }}
                  >
                    {" Sign up "}
                  </Text>
                  to get started!
                </Text>
              </View>
            )}

            {!isJoin && (
              <View className="flex-1 items-center justify-start gap-4">
                <Text style={{ fontFamily: "Inter_400Regular" }}>
                  Add your info to create an account on Chat Me:
                </Text>
                <Input
                  editable={!loading}
                  placeholder="Username (at least 2 characters)"
                  onChangeText={handleChangeUsername}
                  leftIconName="person-outline"
                  leftIconColor={usernameValid ? Colors.primary : undefined}
                  borderColor={usernameValid ? "border-emerald-400" : undefined}
                />
                <Input
                  editable={!loading}
                  placeholder={"Email"}
                  onChangeText={handleChangeEmail}
                  keyboardType="email-address"
                  leftIconName="mail-outline"
                  leftIconColor={emailValid ? Colors.primary : undefined}
                  borderColor={emailValid ? "border-emerald-400" : undefined}
                />
                <Input
                  editable={!loading}
                  placeholder={"Password (at least 6 characters)"}
                  onChangeText={handleChangePassword}
                  leftIconName="key-outline"
                  secureTextEntry={hidePassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  leftIconColor={passwordValid ? Colors.primary : undefined}
                  rightIconName={
                    hidePassword ? "eye-outline" : "eye-off-outline"
                  }
                  rightIconClick={() => setHidePassword(!hidePassword)}
                  borderColor={passwordValid ? "border-emerald-400" : undefined}
                />
                <Text
                  className="text-center"
                  style={{ fontFamily: "Inter_500Medium" }}
                >
                  Already have an account?
                  <Text
                    onPress={() => setIsJoin(!isJoin)}
                    className="text-blue-500"
                    style={{ fontFamily: "Inter_500Medium" }}
                  >
                    {" Join on Chat Me! "}
                  </Text>
                </Text>
              </View>
            )}
          </View>

          <View className="flex-row items-center justify-between">
            <Button
              isLoading={loading}
              title={isJoin ? "Join" : "Register"}
              onPress={handlePressJoin}
              disabled={disabled}
            />
          </View>
        </View>
      </KeyboardView>
    </SafeAreaView>
  );
};

export default Join;
