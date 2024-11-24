import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useGlobalContext } from "../../../context/GlobalProvider";
import CustomButton from "../../../components/CustomButton";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useCodeQRContext } from "../../../context/CodeQRContext";
import CameraOverlay from "../../../pages/CameraOverlay";

const addPoints = () => {
  const { user } = useGlobalContext();
  const { setScannedData } = useCodeQRContext();
  const [cameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const isPermissionGranted = Boolean(permission?.granted);

  // Manage app state for QR code lock reset
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
        setCameraVisible(false); // Close the camera once a code is scanned
        router.push("scanner/scannedUser");
      }, 500);
    }
  };

  // Toggle camera visibility
  const toggleCamera = () => {
    setCameraVisible((prevVisible) => !prevVisible);
  };

  if (!permission) {
    // Loading
    return <View className="bg-primary" />;
  }

  if (!isPermissionGranted) {
    // Camera permissions are not granted yet.
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
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-1 py-4 px-4 space-y-4">
        {/* Login info */}
        <View className="px-4">
          <Text className="text-2xl text-white font-pbold pb-2">
            Smokin's {user ? user.username : "..."}
          </Text>
        </View>

        <View className="flex-1 justify-center place-items-center">
          {/* Scanner button */}
          <CustomButton
            title={cameraVisible ? "Zamknij kamerę" : "Skanuj kod QR"}
            handlePress={toggleCamera}
            containerStyles="bg-black-200"
            textStyles="text-white"
          />

          {cameraVisible && permission && (
            <View className="flex-1 my-8 overflow-hidden rounded-lg">
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
