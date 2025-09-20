import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import * as Brightness from "expo-brightness";

import QRCode from "react-native-qrcode-svg";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

const FullScreenModal = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [originalBrightness, setOriginalBrightness] = useState(1);

  const handleOpen = async () => {
    setModalVisible(true);
    try {
      const currentBrightness = await Brightness.getBrightnessAsync();
      setOriginalBrightness(currentBrightness);

      await Brightness.setBrightnessAsync(1);
    } catch (error) {
      console.error("Error adjusting brightness:", error);
    }
  };

  const handleClose = async () => {
    try {
      if (originalBrightness !== null) {
        await Brightness.setBrightnessAsync(originalBrightness);
      }

      await Brightness.restoreSystemBrightnessAsync();
    } catch (error) {
      console.error("Error restoring brightness:", error);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <>
      <CustomButton
        title="Twój kod QR"
        containerStyles={"mx-4 bg-secondary p-4 mb-8"}
        textStyles={"text-white"}
        handlePress={handleOpen}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClose}
        onDismiss={handleClose}
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <SafeAreaView className="flex-1 bg-primary">
          <View className="flex-1 justify-start items-center bg-primary w-full h-full px-4">
            <View className="p-4 w-full">
              <Text className="text-2xl font-pbold text-white pb-4">
                Twój kod QR
              </Text>
              <Text className="text-lg text-gray-400 font-pregular w-full pb-4">
                Zeskanuj swój kod przy kasie aby nabić punkty lub odebrać
                nagrody.
              </Text>
            </View>
            {/* QR Code */}
            {data ? (
              <View className="justify-center items-center my-4 p-8 rounded-3xl w-full bg-black-100">
                <QRCode
                  value={data.accountId}
                  size={250}
                  color="white"
                  backgroundColor="#191C2B"
                />
              </View>
            ) : (
              <Text className="text-white font-pregular p-4">
                Ładowanie danych użytkownika...
              </Text>
            )}
            <CustomButton
              title="Zamknij"
              containerStyles={"bg-black-200 w-full mt-4"}
              textStyles={"text-white"}
              handlePress={handleClose}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default FullScreenModal;
