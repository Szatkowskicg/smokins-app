import { Image, StyleSheet } from "react-native";
import { icons } from "../constants";

const CrownIcon = () => {
  return <Image source={icons.crown} style={styles.icon} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
    tintColor: "#00C853",
  },
});

export default CrownIcon;
