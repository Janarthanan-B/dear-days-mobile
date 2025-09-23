// App.js
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { MaterialIcons, Feather, FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from "react-native-reanimated";

export default function ScreenModel() {
  const [visible, setVisible] = useState(false);
  const menuOpacity = useSharedValue(0);
  const menuTranslateY = useSharedValue(-10);

  const toggleMenu = () => {
    const show = !visible;
    setVisible(show);

    menuOpacity.value = withTiming(show ? 1 : 0, { duration: 400 });
    menuTranslateY.value = withTiming(show ? 0 : -10, { duration: 400 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: menuOpacity.value,
    transform: [{ translateY: menuTranslateY.value }],
    pointerEvents: visible ? "auto" : "none",
  }));

  return (
    <>
      {/* Top Right Icon */}
      <View style={styles.topRight}>
        <TouchableOpacity onPress={toggleMenu}>
          <Feather name="more-vertical" size={24} color="#ed088a" />
        </TouchableOpacity>
      </View>

      {/* Icon Menu */}
      <Animated.View style={[styles.menuContainer, animatedStyle]}>
        {iconList.map((icon, index) => (
          <Pressable
            key={index}
            style={styles.iconButton}
            onPress={() => console.log(`Pressed ${icon.name}`)}
          >
            <icon.Component name={icon.name} size={24} color="#ED088A" />
          </Pressable>
        ))}
      </Animated.View>
    </>
  );
}

const iconList: any[] = [
  { name: "edit", Component: Feather },
  { name: "trash", Component: Feather },
  { name: "share", Component: Feather },
  { name: "info", Component: Feather },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  topRight: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  menuContainer: {
    position: "absolute",
    top: 90,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 0,
    gap: 10,
    zIndex: 9,
    backdropFilter: "blur(10px)", // optional, will only work on Web or iOS with blur enabled
  },
  iconButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
