import { Alert } from "react-native";
import { getUserDataById, updateUserData, addPointsHistory } from "./appwrite";

export const handleAddPoints = async ({ scannedUserId, points, adminId }) => {
  try {
    const userData = await getUserDataById(scannedUserId);

    if (!userData) {
      Alert.alert("Coś nie tak!", "Nie można pobrać danych użytkownika.");
      return;
    }

    const {
      points: currentPoints,
      crowns: currentCrowns,
      lastCrownUpdate,
      $id: documentId,
    } = userData;

    // Update points and crowns if the crown limit has not been reached
    const updatedPoints = currentPoints + points;

    // Get the current date
    const currentDate = new Date();
    const lastCrownDate = new Date(lastCrownUpdate);

    // Check if the last crown was added today
    const crownsCanBeAdded = lastCrownUpdate
      ? currentDate.getDate() !== lastCrownDate.getDate() ||
        currentDate.getMonth() !== lastCrownDate.getMonth() ||
        currentDate.getFullYear() !== lastCrownDate.getFullYear()
      : true;

    let updatedCrowns = currentCrowns;

    if (crownsCanBeAdded && currentCrowns < 10) {
      updatedCrowns += 1;
      // Update the last crown added timestamp
      await updateUserData(documentId, {
        lastCrownUpdate: currentDate.toISOString(),
      });
    }

    await updateUserData(documentId, {
      points: updatedPoints,
      crowns: updatedCrowns,
    });
    Alert.alert(
      "Elegancko!",
      currentCrowns < 10
        ? "Punkty zostały dodane."
        : "Punkty dodane. Maksymalna ilość koron."
    );

    // Add points history
    await tryAddPointsHistory(scannedUserId, points, adminId);
  } catch (error) {
    console.error("Błąd:", error);
    Alert.alert("Coś nie tak!", "Wystąpił problem z bazą danych.");
  }
};

const tryAddPointsHistory = async (scannedUserId, points, adminId) => {
  try {
    await addPointsHistory(scannedUserId, points, adminId);
  } catch (error) {
    console.error("Błąd:", error);
    Alert.alert(
      "Ostrzeżenie",
      "Punkty zostały dodane, ale wystąpił problem z zapisem historii."
    );
  }
};
