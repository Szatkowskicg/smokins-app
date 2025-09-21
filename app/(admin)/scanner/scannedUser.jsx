import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useCodeQRContext } from "../../../context/CodeQRContext";
import { handleAddPoints } from "../../../lib/handlePoints";
import {
  deleteDocument,
  getCurrentUSer,
  getUserClaimedRewards,
  getUserDataById,
  updateUserData,
} from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";
import CustomButton from "../../../components/CustomButton";
import FormField from "../../../components/FormField";
import EmptyState from "../../../components/EmptyState";
import { icons } from "../../../constants";
import ConfirmAlert from "../../../components/ConfirmAlert";
import { router, useFocusEffect } from "expo-router";

const scannedUser = () => {
  const { scannedData, setScannedData } = useCodeQRContext();

  const {
    data: user,
    refetch: refetchUsers,
    isLoading: isLoadingUser,
  } = useAppwrite(() => getCurrentUSer());
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

  const [orderAmount, setOrderAmount] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [points, setPoints] = useState(0);
  const trashIcon = icons.trash;

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchRewards();
    setRefreshing(false);
  };

  // Change order price to points
  const handleOrderAmountChange = (value) => {
    const formattedValue = value.replace(",", ".");
    setOrderAmount(formattedValue);

    const amount = parseFloat(formattedValue);
    setPoints(!isNaN(amount) ? Math.round(amount * 2) : 0);
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

  //Reset zmiennych
  const resetState = () => {
    setScannedData(null);
    setPoints(0);
    router.replace("/");
  };

  // Removing reward from DB
  const deleteReward = (rewardsId, colectionId) => {
    let counterAdmin = user.rewardsCounter;
    let updatedCounterAdmin = ++counterAdmin;
    let counter = userData.rewardsCounter;
    let updatedCounter = ++counter;

    ConfirmAlert(
      "Usunięcie danych!",
      "Czy nagroda została wydana?",
      async () => {
        try {
          await updateUserData(user.$id, {
            rewardsCounter: updatedCounterAdmin,
          });
          await updateUserData(userData.$id, {
            rewardsCounter: updatedCounter,
          });
          await deleteDocument(rewardsId, colectionId);
          await Promise.all([
            refetchUsers(),
            refetchUsersData(),
            refetchRewards(),
          ]);
        } catch (error) {
          console.error(
            "Błąd podczas usuwania nagrody lub aktualizacji danych:",
            error
          );

          Alert.alert(
            "Błąd",
            "Wystąpił problem podczas usuwania nagrody lub aktualizacji danych."
          );
        }
      }
    );
  };

  const PointItem = ({ title, description, rewardId, rewardCollectionId }) => (
    <View className="px-4 flex-row justify-center items-center mb-4 mr-4">
      <View className="bg-black-100 p-4 flex-1 mr-4 rounded-xl space-y-2">
        <Text className="text-base font-psemibold text-white">{title}</Text>
        <Text className="text-sm font-pregular text-white">{description}</Text>
      </View>

      <TouchableOpacity
        className="p-4"
        onPress={() => deleteReward(rewardId, rewardCollectionId)}
      >
        <Image
          source={trashIcon}
          resizeMode="contain"
          tintColor="#7B767A"
          className="w-5 h-5"
        />
      </TouchableOpacity>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      // Reset state when the screen loses focus
      return () => {
        resetState();
      };
    }, [])
  );

  return (
    <View className="bg-primary h-full">
      <View className="flex-1">
        {/* Scrollable FlatList */}
        <FlatList
          data={rewards}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <PointItem
              title={item.title}
              description={item.description}
              rewardCollectionId={item.$collectionId}
              rewardId={item.$id}
            />
          )}
          ListHeaderComponent={
            <View className="space-y-4 my-4">
              <View className="px-4 space-y-4 pb-4 border-b border-black-200">
                <Text className="text-lg font-psemibold text-white">
                  Dane klienta:
                </Text>
                <View className="flex-row justify-between">
                  <Text className="text-base font-pregular text-white">
                    Login:
                  </Text>
                  <Text className="text-base font-pregular text-white">
                    {userData ? userData.username : "..."}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-base font-pregular text-white">
                    Punkty:
                  </Text>
                  <Text className="text-base font-pregular text-white">
                    {userData ? userData.points : "..."}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-base font-pregular text-white">
                    Korony:
                  </Text>
                  <Text className="text-base font-pregular text-white">
                    {userData ? userData.crowns : "..."}
                  </Text>
                </View>
              </View>
              <Text className="text-lg px-4 pt-4 text-white font-psemibold">
                Odebrane nagrody:{" "}
              </Text>
            </View>
          }
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

        {/* Fixed form and button section at the bottom */}
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
      </View>
    </View>
  );
};

export default scannedUser;
