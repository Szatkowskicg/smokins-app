import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useCodeQRContext } from "../../../context/CodeQRContext";
import { handleAddPoints } from "../../../lib/handlePoints";
import {
  getCurrentUser,
  getUserClaimedRewards,
  getUserDataById,
} from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";
import CustomButton from "../../../components/CustomButton";
import FormField from "../../../components/FormField";
import EmptyState from "../../../components/EmptyState";
import { icons } from "../../../constants";
import ConfirmAlert from "../../../components/ConfirmAlert";
import { router, useFocusEffect } from "expo-router";

import { deleteRewardWithCounters } from "../../../lib/handleRewards";
import { useOrderAmount } from "../../../hooks/useOrderAmount";

// Settings text section component
const TextSection = ({ title, items }) => (
  <View className="mb-6">
    <Text className="text-gray-400 px-4 mb-2 text-base">{title}</Text>
    <View className="bg-black-100 rounded-2xl overflow-hidden">
      {items.map((item, index) => (
        <View
          key={item.label}
          className={`flex-row items-center px-6 py-6 bg-black-100 ${
            index !== items.length - 1 ? "border-b border-[#2F344A]" : ""
          }`}
        >
          <Text className="text-gray-400 text-lg pr-4">{item.label}</Text>
          <Text className="text-white text-lg">{item.data}</Text>
        </View>
      ))}
    </View>
  </View>
);

const scannedUser = () => {
  const { scannedData, setScannedData } = useCodeQRContext();

  const {
    data: user,
    refetch: refetchUsers,
    isLoading: isLoadingUser,
  } = useAppwrite(() => getCurrentUser());
  const {
    data: userData,
    refetch: refetchUsersData,
    isLoading: isLoadingUserData,
  } = useAppwrite(() => getUserDataById(scannedData));
  const {
    data: rewards,
    refetch: refetchRewards,
    isLoading: isLoadingRewards,
  } = useAppwrite(() => getUserClaimedRewards(scannedData));
  const { orderAmount, points, handleOrderAmountChange } = useOrderAmount();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchRewards();
    setRefreshing(false);
  };

  // Handle submitt button and add to DB
  const handleSubmit = () => {
    ConfirmAlert(
      "Potwierdzenie.",
      `Czy na pewno chcesz dodać ${points}Pkt?`,
      async () => {
        if (!scannedData || !orderAmount) {
          Alert.alert(
            "Coś nie tak!",
            !scannedData
              ? "Proszę zeskanuj poprawny kod QR."
              : "Proszę wprowadź wartość zamówienia."
          );
          return;
        }

        const adminId = user.username;
        await handleAddPoints({
          scannedUserId: scannedData,
          points,
          adminId,
        });
        resetState();
      }
    );
  };

  //Reset vars
  const resetState = () => {
    setScannedData(null);
    router.replace("/");
  };

  const handleDeleteReward = (rewardId, collectionId) => {
    deleteRewardWithCounters({
      rewardId,
      collectionId,
      admin: user,
      user: userData,
      refetchUsers,
      refetchUsersData,
      refetchRewards,
    });
  };

  const PointItem = ({
    title,
    description,
    rewardId,
    rewardCollectionId,
    index,
    isLast,
  }) => (
    <View
      className={`flex-row items-center px-6 py-6 bg-black-100 ${
        index === 0 ? "rounded-t-2xl" : ""
      }
      ${isLast ? "rounded-b-2xl" : ""}
      ${!isLast ? "border-b border-[#2F344A]" : ""}`}
    >
      <View className="flex-1">
        <Text className="text-white text-lg font-psemibold">{title}</Text>
        {description ? (
          <Text className="text-gray-400 text-sm font-pregular">
            {description}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={() => handleDeleteReward(rewardId, rewardCollectionId)}
        className="ml-4"
        activeOpacity={0.7}
      >
        <Image
          source={icons.trash}
          resizeMode="contain"
          tintColor="#7B767A"
          className="w-5 h-5"
        />
      </TouchableOpacity>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        resetState();
      };
    }, [])
  );

  return (
    <View className="bg-primary flex-1">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={120}
      >
        {/* Scrollable FlatList */}
        <FlatList
          data={rewards}
          keyExtractor={(item) => item.$id}
          renderItem={({ item, index }) => (
            <PointItem
              index={index}
              title={item.title}
              description={item.description}
              rewardCollectionId={item.$collectionId}
              rewardId={item.$id}
              isLast={index === rewards.length - 1}
            />
          )}
          ListHeaderComponent={
            <View>
              <TextSection
                title="Dane klienta"
                items={[
                  {
                    label: "Login",
                    data: `${userData ? userData.username : "..."}`,
                  },
                  {
                    label: "Punkty",
                    data: `${userData ? userData.points : "..."}`,
                  },
                  {
                    label: "Korony",
                    data: `${userData ? userData.crowns : "..."}`,
                  },
                ]}
              />

              <Text className="text-gray-400 px-4 mb-2 text-base">
                Odebrane nagrody
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
          ListEmptyComponent={() => (
            <EmptyState
              title="Brak nagród."
              subtitle="Nagrody są do odebrania w menu głównym klienta."
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />

        <View className="px-4 py-4 bg-primary">
          <View className="mb-4">
            <FormField
              title="Kwota zamówienia (PLN):"
              handleChangeText={handleOrderAmountChange}
              value={orderAmount}
              placeholder="Wprowadź kwotę"
              keyboardType="decimal-pad"
            />
          </View>

          <CustomButton
            title="Dodaj punkty"
            handlePress={handleSubmit}
            containerStyles="bg-secondary"
            textStyles="text-white"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default scannedUser;
