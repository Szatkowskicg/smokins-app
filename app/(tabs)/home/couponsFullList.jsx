import { View, Text, FlatList, ActivityIndicator } from "react-native";
import useAppwrite from "../../../lib/useAppwrite";
import { getAllCoupons, getAllCouponsIOS } from "../../../lib/appwrite";
import CouponCardFull from "../../../components/CouponCardFull";
import { useCouponsContext } from "../../../context/CouponsContext";

const couponsFullList = () => {
  const { data: coupons, isLoading: isLoadingCoupons } =
    useAppwrite(getAllCoupons);
  const { points, documentId, accountId } = useCouponsContext();

  if (isLoadingCoupons) {
    return (
      <View className="bg-primary h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View className="h-full bg-primary">
      <FlatList
        data={coupons}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <CouponCardFull
            coupon={item}
            points={points}
            documentId={documentId}
            accountId={accountId}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="w-full">
            <Text className="text-white">Brak kuponów do wyświetlenia.</Text>
          </View>
        )}
        contentContainerStyle={{ paddingTop: 14, paddingHorizontal: 14 }}
      />
    </View>
  );
};

export default couponsFullList;
