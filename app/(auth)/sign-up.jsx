import { View, Text, ScrollView, Image, Alert, Platform } from "react-native";
import { CheckBox } from "rn-inkpad";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useCallback } from "react";
import { images } from "../../constants";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

//Password validator
const password_validate = (password) => {
  const re = {
    capital: /(?=.*[A-Z])/,
    length: /(?=.{7,40}$)/,
    specialChar: /[ -\/:-@\[-\`{-~]/,
    digit: /(?=.*[0-9])/,
    noSpaces: /^\S*$/,
  };
  return (
    re.capital.test(password) &&
    re.length.test(password) &&
    re.specialChar.test(password) &&
    re.digit.test(password) &&
    re.noSpaces.test(password)
  );
};

//Email validator
const email_validate = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//Username validator
const username_validate = (username) => /^\S*$/.test(username);

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isNewsletterChecked, setIsNewsletterChecked] = useState(true);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = useCallback(
    (field, value) => setForm((prev) => ({ ...prev, [field]: value })),
    []
  );

  const submit = useCallback(async () => {
    if (!isPrivacyAccepted) {
      return Alert.alert("Błąd", "Musisz zaakceptować politykę prywatności.");
    }
    if (!form.username || !form.email || !form.password) {
      return Alert.alert("Błąd", "Proszę wypełnić wszystkie pola.");
    }
    if (!username_validate(form.username)) {
      return Alert.alert("Błąd", "Login nie może zawierać spacji.");
    }
    if (!email_validate(form.email)) {
      return Alert.alert("Błąd", "Podaj poprawny adres e-mail.");
    }
    if (!password_validate(form.password)) {
      return Alert.alert(
        "Błąd",
        "Hasło musi mieć 7–40 znaków, zawierać dużą literę, cyfrę i znak specjalny, bez spacji."
      );
    }

    setSubmitting(true);
    try {
      const result = await createUser(
        form.email,
        form.password,
        form.username,
        isNewsletterChecked
      );
      setUser(result);
      setIsLogged(true);
      router.replace("/");
    } catch (error) {
      Alert.alert("Błąd rejestracji", error.message || "Coś poszło nie tak.");
    } finally {
      setSubmitting(false);
    }
  }, [form, isNewsletterChecked, isPrivacyAccepted, setUser, setIsLogged]);

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

          <Text className="text-2xl text-white font-psemibold mb-6 text-center">
            Nie masz konta? Zarejestruj się!
          </Text>

          <FormField
            title="Login"
            value={form.username}
            handleChangeText={(value) => handleChange("username", value)}
            otherStyles="mt-4"
          />

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

          {/* Checkbox newsletter */}
          <View className="flex-row items-center mt-6">
            <CheckBox
              checked={isNewsletterChecked}
              onChange={setIsNewsletterChecked}
              iconColor="#2F344A"
              title={
                <Text className="text-base font-pmedium text-gray-100">
                  Chcę otrzymywać aktualności i oferty.
                </Text>
              }
            />
          </View>

          {/* Checkbox priv policy */}
          <View className="flex-row items-center mt-4">
            <CheckBox
              checked={isPrivacyAccepted}
              onChange={setIsPrivacyAccepted}
              iconColor="#2F344A"
              title={
                <Text className="text-base font-pmedium text-gray-100 ml-2">
                  Akceptuję{" "}
                  <Link
                    href="https://sites.google.com/view/smokinsloyaltyclub/polityka-prywatności?authuser=0"
                    className="underline"
                  >
                    politykę prywatności
                  </Link>
                  .
                </Text>
              }
            />
          </View>

          <CustomButton
            title="Utwórz konto"
            handlePress={submit}
            containerStyles="mt-4 bg-pink text-white"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center items-center mt-6 gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Masz już konto?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-pink">
              Zaloguj się
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
