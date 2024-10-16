import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';

const Loading = () => {
  return (
    <View className='flex-1 justify-center' >
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
};

export default Loading;