import { Stack } from "expo-router";
import CodeQRProvider from "../../../context/CodeQRContext";

const scannerLayout = () => {
  return (
    <CodeQRProvider>
      <Stack
        screenOptions={{
          animation: "none",
          contentStyle: { backgroundColor: "#11131F" },
          headerStyle: {
            backgroundColor: "#11131F",
          },
          headerTintColor: "#FFFFFF",
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Skaner", headerShown: false }}
        />
        <Stack.Screen
          name="scannedUser"
          options={{ title: "Skanowanie i punkty" }}
        />
      </Stack>
    </CodeQRProvider>
  );
};

export default scannerLayout;
