import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import CustomButton from "../components/CustomButton";

const InfoModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpen = () => {
    setModalVisible(true);
  };

  const handleClose = async () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        className="w-8 h-8 bg-black-200 rounded-full items-center justify-center"
        onPress={handleOpen}
        activeOpacity={0.7}
      >
        <Image
          source={icons.info}
          resizeMode="contain"
          tintColor={"#FFFFFF"}
          className="w-4 h-4"
        />
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
              Informacje o aplikacji
            </Text>

            <View className="flex-row items-start mb-4 w-full">
              <Image
                source={icons.points}
                className="mt-1 w-4 h-4 mr-2"
                tintColor="#D300D3"
              />
              <Text className="text-base font-pregular text-white">
                <Text className="font-psemibold">Punkty: </Text>
                Zbieraj punkty za zakupy! Za każdy wydany 1 zł otrzymujesz 2
                punkty. Skanuj kod przy zakupach, a nasz pracownik doda punkty
                do Twojego konta.
              </Text>
            </View>

            <View className="flex-row items-start mb-4 w-full">
              <Image
                fill="currentColor"
                source={icons.crown}
                className="mt-1 w-4 h-4 mr-2"
                tintColor="#00C853"
              />
              <Text className="text-base font-pregular text-white">
                <Text className="font-psemibold">Korony: </Text>
                Za każdy zeskanowany paragon (maksymalnie raz dziennie)
                dostajesz koronę. Po uzbieraniu 10 koron możesz wymienić je na
                nagrody.
              </Text>
            </View>

            <View className="flex-row items-center mb-4 w-full">
              <Text className="text-base font-pregular text-white">
                <Text className="font-psemibold">Nagrody: </Text>
                Możesz odbierać nagrody w aplikacji i następnie odebrać je w
                sklepie.
              </Text>
            </View>

            <View className="flex-row items-center mb-4 w-full">
              <Text className="text-base font-pregular text-white">
                <Text className="font-psemibold">Historia: </Text>
                Historia punktów i odebrane nagrody są widoczne w profilu.
              </Text>
            </View>

            <CustomButton
              title="Zamknij"
              containerStyles={"bg-black-200"}
              textStyles={"text-white"}
              handlePress={handleClose}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default InfoModal;
