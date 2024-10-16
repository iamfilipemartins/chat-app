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
    
    console.log('isLogged:', logged);
    if(!logged){
      router.replace("signIn");
    }
    if(logged){
      router.replace("home");
    }
  }, [logged]);

  return <Slot />;
}

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <Layout />
    </AuthContextProvider>
  )
}

export default RootLayout;
