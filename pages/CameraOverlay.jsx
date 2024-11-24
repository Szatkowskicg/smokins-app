import { View } from "react-native";
import React from "react";

const CameraOverlay = () => {
  return (
    <View className="w-full h-full absolute inset-0 flex justify-center items-center">
      {/* Celownik z szarymi rogami */}
      <View className="h-60 w-60">
        {/* Lewy górny róg */}
        <View className="absolute top-0 left-0 w-10 h-10 border-l-4 border-t-4 border-white rounded-tl-xl" />

        {/* Prawy górny róg */}
        <View className="absolute top-0 right-0 w-10 h-10 border-r-4 border-t-4 border-white rounded-tr-xl" />

        {/* Lewy dolny róg */}
        <View className="absolute bottom-0 left-0 w-10 h-10 border-l-4 border-b-4 border-white rounded-bl-xl" />

        {/* Prawy dolny róg */}
        <View className="absolute bottom-0 right-0 w-10 h-10 border-r-4 border-b-4 border-white rounded-br-xl" />
      </View>
    </View>
  );
};

export default CameraOverlay;
