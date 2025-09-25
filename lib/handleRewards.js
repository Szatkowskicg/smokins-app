import { Alert } from "react-native";
import { updateUserData, deleteDocument } from "./appwrite";
import ConfirmAlert from "../components/ConfirmAlert";

export const deleteRewardWithCounters = async ({
  rewardId,
  collectionId,
  admin,
  user,
  refetchUsers,
  refetchUsersData,
  refetchRewards,
}) => {
  const updatedCounterAdmin = admin.rewardsCounter + 1;
  const updatedCounterUser = user.rewardsCounter + 1;

  ConfirmAlert("Usunięcie danych!", "Czy nagroda została wydana?", async () => {
    try {
      await updateUserData(admin.$id, {
        rewardsCounter: updatedCounterAdmin,
      });
      await updateUserData(user.$id, {
        rewardsCounter: updatedCounterUser,
      });
      await deleteDocument(rewardId, collectionId);

      await Promise.all([refetchUsers(), refetchUsersData(), refetchRewards()]);

      Alert.alert("Sukces", "Nagroda została usunięta.");
    } catch (error) {
      console.error("Błąd podczas usuwania nagrody:", error);
      Alert.alert(
        "Błąd",
        "Wystąpił problem podczas usuwania nagrody lub aktualizacji danych."
      );
    }
  });
};
