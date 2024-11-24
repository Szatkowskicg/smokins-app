import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import React from "react";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
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
          animation: "none",
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#00C853",
          tabBarInactiveTintColor: "#7B767A",
          tabBarStyle: {
            backgroundColor: "#11131F",
            borderTopWidth: 1,
            borderTopColor: "#2F344A",
            height: 84,
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
                icon={icons.plus}
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
                icon={icons.minus}
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
