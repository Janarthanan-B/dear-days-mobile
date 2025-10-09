import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useTheme } from "@/hooks/ThemeContext";

const PrimaryLoader: React.FC = () => {
  const { theme } = useTheme();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Interpolating rotation from 0 -> 360 degrees
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <View style={styles.orbit}>
          <View
            style={[
              styles.circle,
              { backgroundColor: theme.backgroundSplash, top: -20 },
            ]}
          />
          <View
            style={[styles.circle, { backgroundColor: theme.primary, top: 20 }]}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  orbit: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: "relative",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    left: 30,
  },
});

export default PrimaryLoader;
