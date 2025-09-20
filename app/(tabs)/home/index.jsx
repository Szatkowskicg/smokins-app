import { View, Text, ScrollView, RefreshControl, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import {
  getCurrentUSer,
  getAllCoupons,
  getAllCouponsIOS,
  getAllRewards,
} from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";

import { icons } from "../../../constants";
import CouponsList from "../../../components/CouponsList";
import FullScreenModal from "../../../pages/FullScreenModal";
import RewardList from "../../../components/RewardList";
import InfoModal from "../../../pages/InfoModal";
import { useCouponsContext } from "../../../context/CouponsContext";

const Home = () => {
  const { data: userData, refetch: refetchUserData } =
    useAppwrite(getCurrentUSer);
  const { data: coupons, refetch: refetchCoupons } = useAppwrite(getAllCoupons);
  const { data: rewards, refetch: refetchRewards } = useAppwrite(getAllRewards);

  const { updateUserData } = useCouponsContext();

  useEffect(() => {
    if (userData) {
      updateUserData(userData);
    }
  }, [userData]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchUserData(), refetchCoupons(), refetchRewards()]);
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary flex-1" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-1 justify-center space-y-8">
          {/* Welcome screen */}
          <View className="flex-row justify-between px-8 pt-4">
            <View className="items-start flex-col mb-6">
              <Text className="text-2xl text-white font-pbold pb-2">
                Cześć, {userData ? userData.username : "..."}
              </Text>
              <View className="justify-between items-center flex-row">
                <Text className="text-base text-white font-plight">Korony</Text>
                <Text className="text-xl text-white font-psemibold px-2">
                  {userData ? userData.crowns : "..."}
                </Text>
                <Image
                  source={icons.crown}
                  resizeMode="contain"
                  tintColor={"#00C853"}
                  className="w-4 h-4"
                />
              </View>

              <View className="justify-between items-center flex-row">
                <Text className="text-base text-white font-plight">Punkty</Text>
                <Text className="text-xl text-white font-psemibold px-2">
                  {userData ? userData.points : "..."}
                </Text>
                <Image
                  source={icons.points}
                  resizeMode="contain"
                  tintColor={"#F400F4"}
                  className="w-4 h-4"
                />
              </View>
            </View>
            <InfoModal />
          </View>

          <FullScreenModal data={userData} />

          {/* Coupons and Rewards */}
          <RewardList
            data={rewards}
            title="Nagrody za korony"
            crowns={userData ? userData.crowns : 0}
            documentId={userData ? userData.$id : null}
            accountId={userData ? userData.accountId : null}
            refetch={refetchUserData}
          />

          <CouponsList
            data={coupons}
            title="Nagrody za punkty"
            tintColor="#D300D3"
            icon={icons.points}
            points={userData ? userData.points : 0}
            documentId={userData ? userData.$id : null}
            accountId={userData ? userData.accountId : null}
            refetch={refetchUserData}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
