import { FlatList, Text, View } from 'react-native'
import React from 'react'
import EmptyState from './EmptyState'
import RewardCard from './RewardCard'

const RewardList = ({ title, data, crowns, documentId, accountId, refetch}) => {
  return (
    <View className='mb-8'>
        <View className='px-8 pb-4'>
          <Text className='text-lg text-white font-psemibold'>
            {title}
          </Text>
        </View>
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.$id}
            renderItem={({ item, index }) => (
                <RewardCard coupon={item} index={index} crowns={crowns} documentId={documentId} accountId={accountId} refetch={refetch}/>
            )}
            pagingEnabled={true}
            snapToInterval={208}
            decelerationRate={0.5}
            snapToAlignment="start"
            scrollEventThrottle={32}
            ListEmptyComponent={() => (
              <View className='w-5/6'>
                <EmptyState 
                    title='Nic tutaj nie ma :('
                    subtitle='Sprawdź później, wkrótce mogą pojawić się nowe oferty!'
                />
              </View>
            )}
        />
    </View>
  )
}

export default RewardList