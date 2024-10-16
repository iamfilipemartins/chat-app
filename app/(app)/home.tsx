import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuthContext } from '@/context/auth';

const Home: React.FC = () => {
  const { handleSignOut, user } = useAuthContext();

  const signOut = async () => {
    await handleSignOut();
  };

  return (
    <View>
      <Text>Home</Text>
      <Text>{JSON.stringify(user)}</Text>
      <Pressable onPress={signOut}>
        <Text>
          Sign Out
        </Text>
      </Pressable>
    </View>
  )
};

export default Home;