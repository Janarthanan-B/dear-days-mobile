// App.js or App.tsx
import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export type MemoryOptionType = "add" | "edit" | "delete";

const iconList: { icon: any; fn: MemoryOptionType }[] = [
  { icon: "plus-square", fn: "add" },
  { icon: "edit", fn: "edit" },
  { icon: "trash", fn: "delete" },
];

interface Props {
  onSelect: (text: MemoryOptionType) => void;
}

const MemoryOptions: React.FC<Props> = ({ onSelect }) => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);

  const [visible, setVisible] = useState(false);

  const containerOpacity = useSharedValue(0);
  const containerTranslateY = useSharedValue(-10);
  const iconAnimations = iconList.map(() => ({
    opacity: useSharedValue(0),
    translateY: useSharedValue(-10),
    scale: useSharedValue(1),
  }));

  const toggleMenu = () => {
    const show = !visible;
    setVisible(show);

    // Animate container
    containerOpacity.value = withTiming(show ? 1 : 0, { duration: 300 });
    containerTranslateY.value = withTiming(show ? 0 : -10, { duration: 300 });

    // Animate icons
    iconAnimations.forEach((anim, index) => {
      const delay = index * 100;

      if (show) {
        anim.opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
        anim.translateY.value = withDelay(
          delay,
          withSpring(0, { damping: 10 })
        );
      } else {
        anim.opacity.value = withTiming(0, { duration: 200 });
        anim.translateY.value = withTiming(-10, { duration: 200 });
      }
    });
  };

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ translateY: containerTranslateY.value }],
    pointerEvents: visible ? "auto" : "none",
  }));

  return (
    <>
      {/* Top Right Icon */}
      <View style={styles.topRight}>
        <TouchableOpacity onPress={toggleMenu}>
          <Feather
            name="more-vertical"
            size={24}
            color={theme.backgroundPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Icon Menu */}
      <Animated.View style={[styles.menuContainer, containerStyle]}>
        {iconList.map((icon, index) => {
          const anim = iconAnimations[index];

          const animatedIconStyle = useAnimatedStyle(() => ({
            opacity: anim.opacity.value,
            transform: [
              { translateY: anim.translateY.value },
              { scale: anim.scale.value },
            ],
          }));

          const handlePressIn = () => {
            anim.scale.value = withTiming(0.9, { duration: 100 });
          };

          const handlePressOut = () => {
            anim.scale.value = withTiming(1, { duration: 100 });
          };

          return (
            <Animated.View key={index} style={animatedIconStyle}>
              <Pressable
                style={styles.iconButton}
                onPress={() => onSelect(icon.fn)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                <Feather
                  name={icon.icon}
                  size={24}
                  color={theme.backgroundPrimary}
                />
              </Pressable>
            </Animated.View>
          );
        })}
      </Animated.View>
    </>
  );
};

const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
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
      backgroundColor: theme.overlay,
      borderRadius: 12,
      paddingVertical: 8,
      gap: 10,
      zIndex: 9,
      paddingHorizontal: 4,
      overflow: "hidden",
    },
    iconButton: {
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
export default MemoryOptions;
