import { View, Text, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useCallback } from "react";
import { images } from "../../constants";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

//Email validator
const email_validate = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = useCallback(
    (field, value) => setForm((prev) => ({ ...prev, [field]: value })),
    []
  );

  const submit = useCallback(async () => {
    if (!email_validate(form.email)) {
      return Alert.alert("Błąd", "Podaj poprawny adres e-mail.");
    }
    if (!form.email || !form.password) {
      return Alert.alert("Błąd", "Proszę wypełnić wszystkie pola.");
    }

    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const user = await getCurrentUser();
      setUser(user);
      setIsLogged(true);

      Alert.alert("Sukces", "Zalogowano pomyślnie.");
      router.replace("/");
    } catch (error) {
      Alert.alert("Błąd logowania", error.message || "Coś poszło nie tak.");
    } finally {
      setSubmitting(false);
    }
  }, [form, setUser, setIsLogged]);

  return (
    <SafeAreaView className="bg-primary flex-1">
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View className="flex-1 justify-center px-4 my-6">
          <View className="items-center mb-10">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[142px] h-[45px]"
            />
          </View>

          <Text className="text-2xl text-white text-semibold mb-6 font-psemibold text-center">
            Wracaj do gry! Zaloguj się!
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(value) => handleChange("email", value)}
            otherStyles="mt-4"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormField
            title="Hasło"
            value={form.password}
            handleChangeText={(value) => handleChange("password", value)}
            otherStyles="mt-4"
            autoCapitalize="none"
          />

          <CustomButton
            title="Zaloguj się"
            handlePress={submit}
            containerStyles="mt-4 bg-secondary text-white"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center items-center mt-6 gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Nie masz jeszcze konta?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Zarejestruj się
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
