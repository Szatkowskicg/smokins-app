import { ScrollView, View, Text } from "react-native";
import { privacyPolicyText } from "../../../constants/textFiles";

const privacyPolicy = () => {
  return (
    <View className="bg-primary flex-1">
      <ScrollView>
        <View className="justify-center px-8 py-4">
          <Text className="text-white text-base font-pregular">
            {privacyPolicyText}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default privacyPolicy;
