import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useGlobalContext } from "../../../context/GlobalProvider";
import { signOut } from "../../../lib/appwrite";
import { icons } from "../../../constants";
import ConfirmAlert from "../../../components/ConfirmAlert";
import DeleteModal from "../../../pages/DeleteModal";

const Settings = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  // Logout user
  const handleLogout = () => {
    ConfirmAlert("Uwaga!", "Czy na pewno chcesz się wylogować?", async () => {
      await signOut();
      setUser(null);
      setIsLogged(false);
      router.replace("/sign-in");
    });
  };

  // Settings section component
  const Section = ({ title, items }) => (
    <View className="mb-6 px-4">
      <Text className="text-gray-400 px-4 mb-2 text-base">{title}</Text>
      <View className="bg-black-100 rounded-2xl overflow-hidden">
        {items.map((item, index) => (
          <TouchableOpacity
            key={item.label}
            activeOpacity={0.7}
            className={`flex-row items-center px-6 py-6 bg-black-100 ${
              index !== items.length - 1 ? "border-b border-[#2F344A]" : ""
            }`}
            onPress={item.onPress}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              tintColor={"#00C853"}
              className="w-5 h-5 mr-4"
            />
            <Text className="text-white text-lg">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="bg-primary flex-1" edges={["top"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="py-4">
        {/* Section: Konto */}
        <Section
          title="Konto"
          items={[
            {
              label: "Odebrane nagrody",
              icon: icons.list,
              onPress: () => router.push("settings/claimed"),
            },
            {
              label: "Historia transakcji",
              icon: icons.list,
              onPress: () => router.push("settings/history"),
            },
            {
              label: "Wyloguj się",
              icon: icons.logout,
              onPress: handleLogout,
            },
          ]}
        />

        {/* Section: Informacje i bezpieczeństwo */}
        <Section
          title="Informacje i bezpieczeństwo"
          items={[
            {
              label: "Zmiana hasła",
              icon: icons.key,
              onPress: () => router.push("settings/passwordChange"),
            },
            {
              label: "Polityka prywatności",
              icon: icons.info,
              onPress: () => router.push("settings/privacyPolicy"),
            },
          ]}
        />

        <DeleteModal />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
