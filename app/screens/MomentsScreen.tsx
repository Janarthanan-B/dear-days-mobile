import { useDrawerProgress } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function MomentsScreen({ navigation }: any) {
  const progress = useDrawerProgress();

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, 10]);
    const scale = interpolate(progress.value, [0, 1], [1, 0.95]);
    return {
      transform: [{ translateX }, { scale }],
      borderRadius: interpolate(progress.value, [0, 1], [0, 20]),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text style={styles.heart}>💗</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Welcome to the Romantic Mini Drawer 💖</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heart: {
    fontSize: 50,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#d6336c",
  },
});
