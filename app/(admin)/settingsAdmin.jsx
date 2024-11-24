import { View, TouchableOpacity, Image, Text  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
import ConfirmAlert from '../../components/ConfirmAlert';
import { signOut } from '../../lib/appwrite';
import { router } from 'expo-router';

const settingsAdmin = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  //Logout user
  const handleLogout = () => {
    ConfirmAlert(
      "Uwaga!",
      "Czy na pewno chcesz się wylogować?",
      async () => {
        await signOut();
        setUser(null);
        setIsLogged(false);
        
        router.replace('/sign-in');
      }
    )
  }

  //Delete user
  const handleDeleteAccount = () => {
    console.log('Delete account');
  };
  
  return (
    <SafeAreaView className='bg-primary h-full'>
        <View className='my-4'>
          <TouchableOpacity
            activeOpacity={0.7}
            className='flex-row items-center justify-start px-8 py-4 border-b border-black-200'
            onPress={() => handleLogout()}
          >
            <Image
                source={icons.logout}
                resizeMode='contain'
                tintColor={'#00C853'}
                className='w-4 h-4 mr-4'
              />
            <Text className='text-white text-lg'>Wyloguj się</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            className='flex-row items-center justify-start px-8 py-4 border-b border-black-200'
            onPress={() => handleDeleteAccount()}
          >
            <Image
                source={icons.trash}
                resizeMode='contain'
                tintColor={'#00C853'}
                className='w-4 h-4 mr-4'
              />
            <Text className='text-white text-lg'>Usuń konto</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default settingsAdmin