import { ActivityIndicator, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';

const App = () => {
  return (
    <View className='flex-1 justify-center' >
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
};

export default App;