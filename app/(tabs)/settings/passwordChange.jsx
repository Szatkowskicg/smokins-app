import { View, ScrollView, KeyboardAvoidingView, Keyboard, Alert, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../../components/FormField';
import CustomButton from '../../../components/CustomButton';

import { updatePassword } from '../../../lib/appwrite';

const passwordChange = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

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

    //Password change
    const handleChangePassword = async () => {

      if (newPassword !== confirmPassword) {
        Alert.alert('Błąd', 'Nowe hasła muszą być identyczne.');
        return;
      }

      if (newPassword === oldPassword) {
          Alert.alert('Błąd', 'Pola Nowe hasło i Potwierdź hasło musą być identyczne.');
          return;
      }
    
      // Check if the new pass is valid
      if (!password_validate(newPassword)) {
        Alert.alert(
          'Błąd',
          'Hasło musi mieć od 7 do 40 znaków, zawierać co najmniej jedną dużą literę, cyfrę i znak specjalny.'
        );
        return;
      }
    
      try {
        await updatePassword(newPassword, oldPassword);
          Alert.alert('Sukces', 'Hasło zostało zmienione.');
      } catch (error) {
          Alert.alert('Błąd', 'Podano niepoprawne hasło lub wystąpił błąd. Proszę spróbować ponownie.');
      }
    };
    

  return (
    <SafeAreaView className='bg-primary h-full'>
        <ScrollView onPress={Keyboard.dismiss}>    
            <View className='w-full px-4 py-4'>
                <FormField 
                    title='Stare hasło'
                    value={oldPassword}
                    handleChangeText={setOldPassword}
                />

                <FormField 
                    title='Nowe hasło'
                    value={newPassword}
                    handleChangeText={setNewPassword}
                    otherStyles='mt-8'
                />

                <FormField 
                    title='Potwierdź hasło'
                    value={confirmPassword}
                    handleChangeText={setConfirmPassword}
                    otherStyles='mt-8'
                />
                <CustomButton 
                    title="Zmień Hasło" 
                    handlePress={handleChangePassword} 
                    containerStyles='bg-secondary mt-8'
                    textStyles='text-white'
                />

            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default passwordChange