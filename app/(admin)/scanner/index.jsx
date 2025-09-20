import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  AppState,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useGlobalContext } from "../../../context/GlobalProvider";
import CustomButton from "../../../components/CustomButton";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useCodeQRContext } from "../../../context/CodeQRContext";
import CameraOverlay from "../../../pages/CameraOverlay";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { icons } from "../../../constants";
import logo from "../../../assets/images/logo-small.png";

const { height } = Dimensions.get("window");

const addPoints = () => {
  const { user } = useGlobalContext();
  const { setScannedData } = useCodeQRContext();
  const [cameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const isPermissionGranted = Boolean(permission?.granted);

  // Animation shared values
  const cameraY = useSharedValue(height);
  const avatarScale = useSharedValue(1);
  const avatarX = useSharedValue(0);

  // Reset QR lock on app state resume
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Handle barcode scan
  const handleBarCodeScanned = ({ data }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      setTimeout(() => {
        setScannedData(data);
        setCameraVisible(false);
        router.push("scanner/scannedUser");
      }, 500);
    }
  };

  // Toggle camera with animation
  const toggleCamera = () => {
    setCameraVisible((prevVisible) => !prevVisible);
  };

  if (!permission) {
    return <View className="bg-primary" />;
  }

  if (!isPermissionGranted) {
    return (
      <View className="bg-primary h-full justify-center items-center px-4">
        <Text className="text-white text-lg mb-4">
          Potrzebujemy twojej zgody na użycie kamery.
        </Text>
        <CustomButton
          title="Użyj Kamery"
          handlePress={requestPermission}
          containerStyles="bg-secondary w-full"
          textStyles="text-white"
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 items-center justify-center">
        {/* Avatar + Name */}
        <View className="flex flex-row items-center mb-12">
          <Animated.View className="pr-4">
            <Image
              source={logo}
              className="bg-black w-16 h-16 rounded-full border-2 border-white"
            />
          </Animated.View>
          <Text className="text-3xl text-white font-bold">
            {user ? user.username : "..."}
          </Text>
        </View>

        {/* Animated Camera Modal */}
        <View className="flex-1 justify-center place-items-center w-full p-4">
          {/* Scanner button */}
          <CustomButton
            title={cameraVisible ? "Zamknij kamerę" : "Skanuj kod QR"}
            handlePress={toggleCamera}
            containerStyles="bg-black-200"
            textStyles="text-white"
          />

          {cameraVisible && permission && (
            <View className="flex-1 my-8 overflow-hidden rounded-3xl">
              <CameraView
                style={{ flex: 1 }}
                mute={true}
                facing="back"
                onBarcodeScanned={handleBarCodeScanned}
              />
              <CameraOverlay />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default addPoints;
