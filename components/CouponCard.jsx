import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { addUserClaimedRewards, updateUserData } from "../lib/appwrite";
import ConfirmAlert from "../components/ConfirmAlert";

const CouponCard = ({
  coupon: { title, description, thumbnail, points_needed },
  index,
  tintColor,
  icon,
  points,
  documentId,
  accountId,
  refetch,
}) => {
  const isButtonDisabled = points < points_needed;

  const onPress = () => {
    ConfirmAlert(
      "Odbierz nagrodę!",
      `Czy na pewno chcesz odebrać nagrodę za ${points_needed}pkt?`,
      async () => {
        const updatedPoints = points - points_needed;

        try {
          await updateUserData(documentId, { points: updatedPoints });
          await addUserClaimedRewards(accountId, title, description);
          await refetch();
          Alert.alert(
            "Sukces!",
            "Punkty zostały odjęte, zeskanuj kod QR w sklepie, by odebrać nagrodę."
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
      className={`w-80 bg-black-100 rounded-3xl p-4 justify-start ${
        index ? "mr-4" : "ml-4 mr-4"
      } `}
    >
      <View className="flex-grow">
        <View className="flex-row justify-between space-x-2">
          <View className="w-3/4">
            <View className="flex-row justify-start items-center">
              <Text className="text-white text-xl font-pbold">
                {points_needed}
              </Text>
              <Image
                source={icon}
                resizeMode="contain"
                tintColor={tintColor}
                className="w-5 h-5 ml-2"
              />
            </View>

            <Text
              className="text-white text-base font-psemibold mt-2"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {title}
            </Text>

            <Text
              className="text-gray-400 text-sm font-pregular mt-1"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          </View>

          <Image
            source={{ uri: thumbnail }}
            resizeMode="contain"
            className="w-1/4"
          />
        </View>
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
          Odbierz za {points_needed}pkt
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CouponCard;
