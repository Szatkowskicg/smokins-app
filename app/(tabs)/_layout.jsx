import { View, Text, Image, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

const { height: screenHeight } = Dimensions.get("window");
const tabBarHeight = screenHeight * 0.1;

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex-1 items-center justify-center w-52 ">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6 mb-2"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-sm`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
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
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Puplit",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Pulpit"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
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

export default TabsLayout;
