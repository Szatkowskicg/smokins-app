import { View, Text, ScrollView, Image, Alert } from "react-native";
import { CheckBox } from "rn-inkpad";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { images } from "../../constants";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

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

  const password_validate = (password) => {
    var re = {
      capital: /(?=.*[A-Z])/, // co najmniej jedna duża litera
      length: /(?=.{7,40}$)/, // długość od 7 do 40 znaków
      specialChar: /[ -\/:-@\[-\`{-~]/, // co najmniej jeden znak specjalny
      digit: /(?=.*[0-9])/, // co najmniej jedna cyfra
      noSpaces: /^\S*$/, // brak spacji
    };
    return (
      re.capital.test(password) &&
      re.length.test(password) &&
      re.specialChar.test(password) &&
      re.digit.test(password) &&
      re.noSpaces.test(password)
    );
  };

  const email_validate = (email) => {
    // Proste sprawdzenie czy adres e-mail jest poprawny
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const username_validate = (username) => {
    // Sprawdza, czy login nie zawiera pustych znaków
    const usernameRegex = /^\S*$/; // Brak spacji
    return usernameRegex.test(username);
  };

  const submit = async () => {
    if (!isPrivacyAccepted) {
      alert("Musisz zaakceptować politykę prywatności.");
      return;
    }

    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Błąd", "Prosze wypełnić wszystkie pola");
      return;
    }

    if (!username_validate(form.username)) {
      Alert.alert("Błąd", "Login nie może zawierać spacji.");
      return;
    }

    if (!email_validate(form.email)) {
      Alert.alert("Błąd", "Proszę podać poprawny adres e-mail.");
      return;
    }

    if (!password_validate(form.password)) {
      Alert.alert(
        "Błąd",
        "Hasło musi mieć od 7 do 40 znaków, zawierać co najmniej jedną dużą literę, cyfrę i znak specjalny."
      );
      return;
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
      Alert.alert("Błąd", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <View className="items-center">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[142px] h-[45px]"
            />
          </View>

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Nie masz konta? Zarejestruj się!
          </Text>

          <FormField
            title="Login"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Hasło"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            autoCapitalize="none"
          />

          {/* Checkbox newsletter */}
          <View className="flex-row items-center mt-7">
            <CheckBox
              checked={isNewsletterChecked}
              onChange={setIsNewsletterChecked}
              iconColor={"#2F344A"}
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
              iconColor={"#2F344A"}
              title={
                <Text className="text-base text-gray-100 font-pmedium ml-2">
                  Akceptuję{" "}
                  <Link
                    href="https://sites.google.com/view/smokinsloyaltyclub/polityka-prywatności?authuser=0"
                    className="underline"
                  >
                    politykę prywatności.
                  </Link>
                </Text>
              }
            />
          </View>

          <CustomButton
            title="Utwórz konto"
            handlePress={submit}
            containerStyles="mt-7 bg-pink"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Masz już konto?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-pink">
              Zaloguj się
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
