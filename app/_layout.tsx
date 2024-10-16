import { Slot, useRouter, useSegments } from "expo-router";

// Import your global CSS file
import "../global.css";

import { useEffect } from "react";
import { AuthContextProvider, useAuthContext } from "@/context/auth";

const Layout = () => {
  const { logged } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const insideChatFlow = segments[0] === "(app)";

    if(typeof logged === undefined) {
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
