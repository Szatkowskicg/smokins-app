import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const { loading, isLogged, user } = useGlobalContext();
  const isAdmin = user ? user.isAdmin : false;

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <Image
            source={images.logo}
            className='w-[190px] h-[120px]'
            resizeMode='contain'
        />
        <ActivityIndicator size="large" color="#00C853" />
        <StatusBar backgroundColor='#11131F' style='light' />
      </SafeAreaView>
    );
  }

  if (isLogged) {
    if (isAdmin) {
      return <Redirect href='/scanner' />;
    } else {
      return <Redirect href='/home' />;
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className='w-full min-h-[90vh] justify-center items-center px-4'>
          <Image 
            source={images.logo}
            className='w-[190px] h-[120px]'
            resizeMode='contain'
          />
          <Image 
            source={images.cards}
            className='max-w-[400px] w-full h-[340px]'
            resizeMode='contain'
          />
          <View className='mt-5'>
            <Text className='text-3xl text-white font-pbold text-center'>
              Twój styl, Twój smak! Wbijaj do{' '}
                <Text className='text-secondary-200'>Smokin’s</Text>{'\n'}
            </Text>
          </View>
          <CustomButton 
            title='Zaczynamy!'
            handlePress={() => router.push('/sign-in')}
            containerStyles='w-full mt-7 bg-secondary'
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#11131F' style='light'/>
    </SafeAreaView>
  );
}