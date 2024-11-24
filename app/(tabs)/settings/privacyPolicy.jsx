import { ScrollView, View, Text, SafeAreaView } from 'react-native';
import React from 'react'
import { privacyPolicyText } from '../../../constants/textFiles'

const privacyPolicy = () => {
    return (
        <SafeAreaView className='bg-primary h-full'>
          <ScrollView>
            <View className='justify-center px-8 py-4'>
              <Text className='text-white text-base font-pregular'>{privacyPolicyText}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
    );
}

export default privacyPolicy