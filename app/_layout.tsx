/* eslint-disable valid-typeof */
// Import your global CSS file
import "../global.css";

import { Slot, useRouter, useSegments } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { useEffect } from "react";
import { AuthContextProvider, useAuthContext } from "@/context/auth";
import { Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from "@expo-google-fonts/inter";

const Layout = () => {
  const { logged } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  const [loaded, error] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    const insideChatFlow = segments[0] === "(app)";

    if (typeof logged === undefined) {
      return;
    }

    if (!logged) {
      router.replace("join");
    }

    if (logged && !insideChatFlow) {
      router.replace("chats");
    }
  }, [logged]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <Layout />
    </AuthContextProvider>
  );
};

export default RootLayout;
