import { View, Text, FlatList, RefreshControl, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { getUserClaimedRewards } from '../../../lib/appwrite';
import useAppwrite from '../../../lib/useAppwrite';
import EmptyState from '../../../components/EmptyState';
import { useGlobalContext } from '../../../context/GlobalProvider';

const ClaimedRewards = () => {
  const { user } = useGlobalContext();
  const { data: rewards, refetch: refetchRewards, isLoading: isLoadingRewards } = useAppwrite(() => getUserClaimedRewards(user.accountId));

  const [refreshing, setRefreshing] = useState(false);
  
    const onRefresh = async () => {
        setRefreshing(true);
        await Promise.all([ refetchRewards() ]);
        setRefreshing(false);
    }
  
    const PointItem = ({ title, description }) => {
      return (
        <View className="mx-4 bg-black-100 p-4 space-y-2 mb-4 rounded-xl">
            <Text className="text-base font-psemibold text-white">{title}</Text>
            <Text className="text-sm font-pregular text-white">{description}</Text>
        </View>
      );
    };
  
    if (isLoadingRewards) {
      return (
        <SafeAreaView className="bg-primary h-full flex justify-center items-center">
          <ActivityIndicator size="large" color="#00ff00" />
        </SafeAreaView>
      );
    }
  
    return (
      <SafeAreaView className='bg-primary h-full'>
          <FlatList
            data={rewards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <PointItem title={item.title} description={item.description} />
            )}
            ListEmptyComponent={() => (
              <EmptyState 
                  title='Nic tutaj nie ma :('
                  subtitle='Zbieraj punkty i odbieraj nagrody!'
              />
          )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ paddingTop: 16 }}
          />
      </SafeAreaView>
    )
}
export default ClaimedRewards