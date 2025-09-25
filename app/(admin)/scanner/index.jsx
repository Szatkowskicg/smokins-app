import { useState, useEffect, useRef } from "react";
import { View, Text, AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { CameraView, useCameraPermissions } from "expo-camera";
import { useCodeQRContext } from "../../../context/CodeQRContext";
import { useGlobalContext } from "../../../context/GlobalProvider";

import CustomButton from "../../../components/CustomButton";
import CameraOverlay from "../../../pages/CameraOverlay";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { images } from "../../../constants";

const addPoints = () => {
  const { user } = useGlobalContext();
  const { setScannedData } = useCodeQRContext();
  const [cameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const isPermissionGranted = Boolean(permission?.granted);

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
    <SafeAreaView className="flex-1 bg-primary" edges={["top"]}>
      <View className="flex-1 py-4">
        {/* Top: Avatar + Username */}
        <View className="items-center py-6 px-4">
          <View className="flex-col items-center">
            <Text className="text-3xl text-white font-bold">
              Smokin's {user ? user.username : "..."}
            </Text>
          </View>
        </View>

        {/* Middle: Animated image / camera */}
        <View className="flex-1 justify-center items-center overflow-hidden pb-4 px-4">
          {!cameraVisible && (
            <Animated.Image
              source={images.scanner}
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(300)}
              className="w-5/6 h-full"
              resizeMode="contain"
            />
          )}

          {cameraVisible && (
            <Animated.View
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(400)}
              className="w-full h-full overflow-hidden rounded-3xl"
            >
              <CameraView
                style={{ flex: 1 }}
                mute={true}
                facing="back"
                onBarcodeScanned={handleBarCodeScanned}
              />
              <CameraOverlay />
            </Animated.View>
          )}
        </View>

        {/* Bottom: Button */}
        <View className="px-4">
          <CustomButton
            title={cameraVisible ? "Zamknij kamerę" : "Skanuj kod QR"}
            handlePress={toggleCamera}
            containerStyles="bg-black-200 bg-secondary-100"
            textStyles="text-white"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default addPoints;
