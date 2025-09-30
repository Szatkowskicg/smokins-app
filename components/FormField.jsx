import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${otherStyles}`}>
      <Text className="pl-4 text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 border-black-200 w-full px-4 bg-black-100 rounded-lg focus:border-gray-100 items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base py-4"
          value={value}
          cursorColor="#7B767A"
          placeholder={placeholder}
          placeholderTextColor="#7B767A"
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "Hasło" ||
              title === "Stare hasło" ||
              title === "Nowe hasło" ||
              title === "Potwierdź hasło") &&
            !showPassword
          }
          keyboardType={keyboardType}
          {...props}
        />

        {(title === "Hasło" ||
          title === "Stare hasło" ||
          title === "Nowe hasło" ||
          title === "Potwierdź hasło") && (
          <View className="ml-4">
            <TouchableOpacity
              className="h-12 px-2 justify-center items-center"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6 opacity-35"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default FormField;
