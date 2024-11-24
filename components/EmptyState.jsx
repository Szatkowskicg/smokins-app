import { View, Text, Image } from 'react-native'
import React from 'react'

import { images } from '../constants'

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className='justify-center items-center px-8'>
        <Image source={images.empty} className='w-[30px] h-[30px] m-4' resizeMode='contain'/>

        <Text className='text-lg text-center text-white font-pmedium'>
            {title}
        </Text>
        <Text className='text-sm text-center text-white font-pmedium'>
            {subtitle}
        </Text>
        
    </View>

    
  )
}

export default EmptyState