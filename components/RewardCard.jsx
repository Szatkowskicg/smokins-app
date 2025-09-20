import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import ConfirmAlert from "./ConfirmAlert";
import { addUserClaimedRewards, updateUserData } from "../lib/appwrite";

const RewardCard = ({
  coupon: { title, description, thumbnail },
  index,
  crowns,
  documentId,
  accountId,
  refetch,
}) => {
  const isButtonDisabled = crowns !== 10;

  const onPress = () => {
    ConfirmAlert(
      "Odbierz nagrodę!",
      "Czy na pewno chcesz odebrać nagrodę za 10 koron?",
      async () => {
        try {
          await updateUserData(documentId, { crowns: 0 });
          await refetch();
          await addUserClaimedRewards(accountId, title, description);
          Alert.alert(
            "Sukces!",
            "Zeskanuj kod QR w sklepie, by odebrać nagrodę."
          );
        } catch (error) {
          Alert.alert(
            "Błąd!",
            "Nie udało się odebrać nagrody. Spróbuj ponownie."
          );
        }
      }
    );
  };

  return (
    <View
      className={`w-48 bg-black-100 rounded-3xl p-4 justify-start ${
        index ? "mr-4" : "ml-4 mr-4"
      } `}
    >
      <View className="flex-grow">
        <Image
          source={{ uri: thumbnail }}
          resizeMode="contain"
          className="w-40 h-28"
        />
        <View className="flex-row justify-between">
          <Text
            className="text-white text-base font-psemibold mt-2"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        </View>

        <Text
          className="text-gray-400 text-sm font-pregular mt-1"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>

      <TouchableOpacity
        className={`rounded-xl mt-4 py-2 ${
          isButtonDisabled ? "bg-black-100" : "bg-black-200"
        }`}
        onPress={!isButtonDisabled ? onPress : null}
        disabled={isButtonDisabled}
      >
        <Text
          className={`text-center font-psemibold text-base ${
            isButtonDisabled ? "text-black-200" : "text-white"
          }`}
        >
          Odbierz
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RewardCard;
