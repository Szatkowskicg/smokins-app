import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import EmptyState from "./EmptyState";
import CouponCard from "./CouponCard";
import { router } from "expo-router";
import { icons } from "../constants";

const CouponsList = ({
  title,
  data,
  tintColor,
  icon,
  points,
  documentId,
  accountId,
  refetch,
}) => {
  const limitedCoupons = Array.isArray(data) ? data.slice(0, 5) : [];

  const handleShowMore = () => {
    router.push("/home/couponsFullList");
  };

  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center px-8 pb-4">
        <Text className="text-lg text-white font-psemibold">{title}</Text>
        <TouchableOpacity onPress={handleShowMore}>
          <View className="flex-row justify-center items-center">
            <Text className="text-sm font-pregular text-white">więcej</Text>
            <Image
              source={icons.rightArrow}
              tintColor={"#ffffff"}
              className="w-4 h-4 ml-1"
            />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={limitedCoupons}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, index }) => (
          <CouponCard
            coupon={item}
            index={index}
            tintColor={tintColor}
            icon={icon}
            points={points}
            documentId={documentId}
            accountId={accountId}
            refetch={refetch}
          />
        )}
        pagingEnabled={true}
        snapToInterval={294}
        decelerationRate={0.5}
        snapToAlignment="start"
        scrollEventThrottle={32}
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

export default CouponsList;
