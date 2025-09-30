import { View, Text, Image, Dimensions, Easing } from "react-native";
import { StatusBar } from "expo-status-bar";
import { icons } from "../../constants";
import { Tabs } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";

const { height: screenHeight } = Dimensions.get("window");
const tabBarHeight = screenHeight * 0.1;

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex-1 items-center justify-center w-52">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6 mb-2"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const AdminLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          contentStyle: { backgroundColor: "#11131F" },
          sceneStyle: { backgroundColor: "#11131F" },
          animation: "shift",
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#00C853",
          tabBarInactiveTintColor: "#7B767A",
          tabBarStyle: {
            paddingTop: tabBarHeight * 0.2,
            backgroundColor: "#11131F",
            borderTopWidth: 1,
            borderTopColor: "#2F344A",
            height: tabBarHeight,
          },
        }}
      >
        <Tabs.Screen
          name="scanner"
          options={{
            title: "Skaner",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.scanner}
                color={color}
                name="Skaner"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settingsAdmin"
          options={{
            title: "Profil",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profil"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#11131F" style="light" />
    </>
  );
};

export default AdminLayout;
