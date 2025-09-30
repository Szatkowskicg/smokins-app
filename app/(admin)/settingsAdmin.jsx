import { View, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import ConfirmAlert from "../../components/ConfirmAlert";
import { signOut } from "../../lib/appwrite.js";
import { router } from "expo-router";

const settingsAdmin = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  //Logout user
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
      <Text className="text-gray-400 px-4 mb-2 text-base font-pregular">
        {title}
      </Text>
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
            <Text className="text-white text-lg font-pregular">
              {item.label}
            </Text>
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
              label: "Wyloguj się",
              icon: icons.logout,
              onPress: handleLogout,
            },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default settingsAdmin;
