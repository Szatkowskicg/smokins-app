import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { addUserClaimedRewards, updateUserData } from '../lib/appwrite';
import ConfirmAlert from '../components/ConfirmAlert'
import icons from '../constants/icons'
import { router } from 'expo-router';

const CouponCardFull = ({ 
    coupon: {title, description, thumbnail, points_needed}, points, documentId, accountId }) => {
  const isButtonDisabled = points < points_needed;

  onPress = () => {
    ConfirmAlert(
      "Odbierz nagrodę!",
      `Czy na pewno chcesz odebrać nagrodę za ${points_needed}pkt?`,
      async () => {
        const updatedPoints = points - points_needed;
  
        try {
          await updateUserData(documentId, { points: updatedPoints });
          await addUserClaimedRewards(accountId, title, description);
          router.replace('/')
          Alert.alert('Sukces!', 'Punkty zostały odjęte, zeskanuj kod QR w sklepie, by odebrać nagrodę.');
        } catch (error) {
          Alert.alert('Błąd!', 'Nie udało się odebrać nagrody. Spróbuj ponownie.');
        }
      }
    )
  }

  return (
    <View className='w-full bg-black-100 rounded-lg p-4 justify-start mb-4'>

      
        <View className='flex-row justify-between space-x-2'>
            <View className='w-3/4'>
                <View className="flex-row justify-start items-center space-x-2">
                    <Text className="text-white text-xl font-pbold">{points_needed}</Text>
                    <Image
                    source={icons.points}
                    resizeMode="contain"
                    tintColor='#D300D3'
                    className="w-5 h-5"
                    />
                </View>

                <Text 
                    className="text-white text-base font-psemibold mt-2"
                    ellipsizeMode='tail'>
                    {title}
                </Text>

                <Text 
                    className="text-gray-400 text-sm mt-1"
                    ellipsizeMode="tail">
                    {description}
                </Text>
            </View>

            <Image
            source={{ uri: thumbnail }}
            resizeMode="contain"
            className="w-1/4"
            />

        </View>


      <TouchableOpacity 
        className={`rounded-lg mt-4 py-2 ${isButtonDisabled ? 'bg-black-100' : 'bg-black-200'}`} 
        onPress={!isButtonDisabled ? onPress : null}
        disabled={isButtonDisabled}
      >
        <Text className={`text-center font-bold ${isButtonDisabled ? 'text-black-200' : 'text-white'}`}>
          Odbierz za {points_needed}pkt
        </Text>
      </TouchableOpacity>
    </View>
   
  )
}

export default CouponCardFull;