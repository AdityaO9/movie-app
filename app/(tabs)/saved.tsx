import { View, Text } from 'react-native'
import React from 'react'

const saved = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
          <View className='flex justify-center items-center 
          flex-1 flex-col gap-5'>
            <Image source={icons.saved}className='size-10' tintColor="#Fff" />
            <Text className='text-gray-500 text-base'>Saved</Text>
          </View>
        </View>
  )
}

export default saved