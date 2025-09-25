import { Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

const CameraOverlay = () => {
  const boxSize = width * 0.5;

  return (
    <View className="w-full h-full absolute inset-0 flex justify-center items-center">
      <View style={{ width: boxSize, height: boxSize }}>
        <View className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-white rounded-tl-3xl" />

        <View className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-white rounded-tr-3xl" />

        <View className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-white rounded-bl-3xl" />

        <View className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-white rounded-br-3xl" />
      </View>
    </View>
  );
};

export default CameraOverlay;
