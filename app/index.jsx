import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { loading, isLogged, user } = useGlobalContext();

  // App load
  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <Image
          source={images.logo}
          className="w-[190px] h-[120px] mb-6"
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#00C853" />
        <StatusBar backgroundColor="#11131F" style="light" />
      </SafeAreaView>
    );
  }

  // Redirect after login
  if (isLogged) {
    return <Redirect href={user?.isAdmin ? "/scanner" : "/home"} />;
  }

  //Welcome screene
  return (
    <SafeAreaView className="bg-primary flex-1 ">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center px-4">
          <Image
            source={images.logo}
            className="w-[190px] h-[120px] mb-6"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[400px] w-full h-[340px] mb-6"
            resizeMode="contain"
          />
          <Text className="text-3xl text-white font-pbold text-center mb-6">
            Twój styl, Twój smak! Wbijaj do{" "}
            <Text className="text-secondary-200">Smokin’s</Text>
          </Text>
          <CustomButton
            title="Zaczynamy!"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full bg-secondary"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#11131F" style="light" />
    </SafeAreaView>
  );
}
