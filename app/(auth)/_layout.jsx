import { Stack, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#11131F" },
          animation: "none",
        }}
      >
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#11131F" style="light" />
    </>
  );
};

export default AuthLayout;
