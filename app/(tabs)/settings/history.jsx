import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { getPointsHistory } from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";
import EmptyState from "../../../components/EmptyState";

const history = () => {
  const {
    data: pointsHistory,
    refetch: refetchHistory,
    isLoading: isLoadingHistory,
  } = useAppwrite(getPointsHistory);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchHistory()]);
    setRefreshing(false);
  };

  const PointItem = ({ points, date }) => {
    return (
      <View className="mx-4 bg-black-100 p-4 mb-4 rounded-xl flex-row justify-between items-center">
        <View>
          <Text className="text-base font-psemibold text-white">
            Zdobyłeś {points} punktów
          </Text>

          <Text className="text-sm font-plight text-white">
            {new Date(date).toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        <View className="bg-secondary pt-1 w-14 h-14 rounded-full flex items-center justify-center">
          <Text className="text-white font-psemibold text-lg">{points}</Text>
        </View>
      </View>
    );
  };

  if (isLoadingHistory) {
    return (
      <View className="bg-primary h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <FlatList
        data={pointsHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PointItem points={item.points} date={item.timestamp} />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Nic tutaj nie ma :("
            subtitle="Zbieraj punkty i odbieraj nagrody!"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingTop: 16 }}
      />
    </View>
  );
};

export default history;
