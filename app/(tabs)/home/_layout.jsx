import { Stack } from "expo-router";
import CouponsProvider from "../../../context/CouponsContext";

const homeLayout = () => {
  return (
    <CouponsProvider>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#11131F" },
          sceneStyle: { backgroundColor: "#11131F" },
          animation: "fade",
          headerStyle: {
            backgroundColor: "#11131F",
          },
          headerTintColor: "#FFFFFF",
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Pulpit", headerShown: false }}
        />
        <Stack.Screen
          name="couponsFullList"
          options={{ title: "Lista Nagród" }}
        />
      </Stack>
    </CouponsProvider>
  );
};

export default homeLayout;
