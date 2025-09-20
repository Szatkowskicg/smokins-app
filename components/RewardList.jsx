import { View, Text, FlatList } from "react-native";
import EmptyState from "./EmptyState";
import RewardCard from "./RewardCard";

const RewardList = ({
  title,
  data,
  crowns,
  documentId,
  accountId,
  refetch,
}) => {
  return (
    <View className="mb-8">
      <View className="px-8 pb-4">
        <Text className="text-lg text-white font-psemibold">{title}</Text>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.$id}
        snapToInterval={200 + 8}
        decelerationRate={0.75}
        snapToAlignment="start"
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <RewardCard
            coupon={item}
            index={index}
            crowns={crowns}
            documentId={documentId}
            accountId={accountId}
            refetch={refetch}
          />
        )}
        pagingEnabled={true}
        ListEmptyComponent={() => (
          <View className="w-5/6">
            <EmptyState
              title="Nic tutaj nie ma :("
              subtitle="Sprawdź później, wkrótce mogą pojawić się nowe oferty!"
            />
          </View>
        )}
      />
    </View>
  );
};

export default RewardList;
