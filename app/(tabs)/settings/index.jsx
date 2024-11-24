import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useGlobalContext } from "../../../context/GlobalProvider";
import { deleteUser, signOut } from "../../../lib/appwrite";
import { icons } from "../../../constants";
import ConfirmAlert from "../../../components/ConfirmAlert";
import DeleteModal from "../../../pages/DeleteModal";

const Settings = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  //Logout user
  const handleLogout = () => {
    ConfirmAlert("Uwaga!", "Czy na pewno chcesz się wylogować?", async () => {
      await signOut();
      setUser(null);
      setIsLogged(false);

      router.replace("/sign-in");
    });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* Settings options */}
      <View className="my-4">
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center justify-start px-8 py-4 border-b border-black-200"
          onPress={() => router.push("settings/claimed")}
        >
          <Image
            source={icons.list}
            resizeMode="contain"
            tintColor={"#00C853"}
            className="w-4 h-4 mr-4"
          />
          <Text className="text-white text-lg">Odebrane Nagrody</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center justify-start px-8 py-4 border-b border-black-200"
          onPress={() => router.push("settings/history")}
        >
          <Image
            source={icons.list}
            resizeMode="contain"
            tintColor={"#00C853"}
            className="w-4 h-4 mr-4"
          />
          <Text className="text-white text-lg">Historia transakcji</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center justify-start px-8 py-4 border-b border-black-200"
          onPress={() => router.push("settings/passwordChange")}
        >
          <Image
            source={icons.key}
            resizeMode="contain"
            tintColor={"#00C853"}
            className="w-4 h-4 mr-4"
          />
          <Text className="text-white text-lg">Zmiana hasła</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center justify-start px-8 py-4 border-b border-black-200"
          onPress={() => router.push("settings/privacyPolicy")}
        >
          <Image
            source={icons.info}
            resizeMode="contain"
            tintColor={"#00C853"}
            className="w-4 h-4 mr-4"
          />
          <Text className="text-white text-lg">Polityka prywatności</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center justify-start px-8 py-4 border-b border-black-200"
          onPress={() => handleLogout()}
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            tintColor={"#00C853"}
            className="w-4 h-4 mr-4"
          />
          <Text className="text-white text-lg">Wyloguj się</Text>
        </TouchableOpacity>
        <DeleteModal />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
