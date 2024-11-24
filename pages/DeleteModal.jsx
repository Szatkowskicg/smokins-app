import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import Trash from "../assets/icons/faTrash.png";
import { deleteUserAndData } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";
import { router } from "expo-router";

const DeleteModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isDeletable, setIsDeletable] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();

  const handleOpen = () => {
    setModalVisible(true);
    setCountdown(10);
    setIsDeletable(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsDeletable(true);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAndData();
      setUser(null);
      setIsLogged(false);
      setModalVisible(false);
      router.replace("/");
    } catch (error) {
      Alert.alert("Błąd", error.message);
      setModalVisible(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row items-center justify-start px-8 py-4 border-b border-black-200"
        onPress={handleOpen}
      >
        <Image
          source={Trash}
          resizeMode="contain"
          tintColor={"#00C853"}
          className="w-4 h-4 mr-4"
        />
        <Text className="text-white text-lg">Usuń konto</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClose}
        onDismiss={handleClose}
      >
        <View className="flex-1 justify-center items-center bg-black-800 bg-opacity-70">
          <View className="bg-primary rounded-xl w-auto p-8 mx-6 border-2 border-black-200">
            <Text className="text-lg font-bold mb-4 text-white">
              Potwierdzenie usunięcia konta
            </Text>

            <Text className="text-base font-pregular text-white mb-4">
              Czy na pewno chcesz usunąć konto? Spowoduje to usunięcie
              wszystkich danych z wyjątkiem historii punktów, która zostanie
              usunięta w ciągu 30 dni.
            </Text>

            {/* Timer */}
            {!isDeletable && (
              <Text className="text-base text-center text-white">
                Możesz usunąć konto za {countdown} sekund...
              </Text>
            )}

            {/* Przycisk usuwania */}
            <CustomButton
              title="Usuń konto"
              containerStyles={`bg-black-200 mt-4 ${
                isDeletable ? "" : "opacity-50"
              }`}
              textStyles="text-white"
              handlePress={isDeletable ? handleDeleteAccount : null}
              disabled={!isDeletable}
            />

            {/* Przycisk anulowania */}
            <CustomButton
              title="Anuluj"
              containerStyles="bg-black-200 mt-2"
              textStyles="text-white"
              handlePress={handleClose}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DeleteModal;
