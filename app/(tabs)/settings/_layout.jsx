import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#11131F" },
        sceneStyle: { backgroundColor: "#11131F" },
        headerStyle: {
          backgroundColor: "#11131F",
        },
        headerTintColor: "#FFFFFF",
        animation: "none",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Profil", headerShown: false }}
      />
      <Stack.Screen name="claimed" options={{ title: "Odebrane Nagrody" }} />
      <Stack.Screen name="history" options={{ title: "Historia transakcji" }} />
      <Stack.Screen name="passwordChange" options={{ title: "Zmiena hasła" }} />
      <Stack.Screen
        name="privacyPolicy"
        options={{ title: "Polityka prywatności" }}
      />
    </Stack>
  );
}
