import { View, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import ConfirmAlert from "../../components/ConfirmAlert";
import { signOut } from "../../lib/appwrite";
import { router } from "expo-router";

const settingsAdmin = () => {
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

  //Delete user
  const handleDeleteAccount = () => {
    console.log("Delete account");
  };

  // Settings section component
  const Section = ({ title, items }) => (
    <View className="mb-6 px-4">
      <Text className="text-gray-400 px-4 mb-2 text-base">{title}</Text>
      <View className="bg-[#1A1C2A] rounded-2xl overflow-hidden">
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
    // <SafeAreaView className="bg-primary h-full">
    //   <View className="my-4">
    //     <TouchableOpacity
    //       activeOpacity={0.7}
    //       className="flex-row items-center justify-start px-8 py-4 border-b border-black-200"
    //       onPress={() => handleLogout()}
    //     >
    //       <Image
    //         source={icons.logout}
    //         resizeMode="contain"
    //         tintColor={"#00C853"}
    //         className="w-4 h-4 mr-4"
    //       />
    //       <Text className="text-white text-lg">Wyloguj się</Text>
    //     </TouchableOpacity>

    //     <TouchableOpacity
    //       activeOpacity={0.7}
    //       className="flex-row items-center justify-start px-8 py-4 border-b border-black-200"
    //       onPress={() => handleDeleteAccount()}
    //     >
    //       <Image
    //         source={icons.trash}
    //         resizeMode="contain"
    //         tintColor={"#00C853"}
    //         className="w-4 h-4 mr-4"
    //       />
    //       <Text className="text-white text-lg">Usuń konto</Text>
    //     </TouchableOpacity>
    //   </View>
    // </SafeAreaView>

    <SafeAreaView className="bg-primary h-full" edges={["top"]}>
      <ScrollView className="py-4">
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
