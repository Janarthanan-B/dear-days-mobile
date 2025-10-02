import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import { useDrawerProgress } from "@react-navigation/drawer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const items = [
  {
    icon: require("../../../assets/icon/milestone_icon.png"),
    screen: "home",
  },
  {
    icon: require("../../../assets/icon/moments_icon.png"),
    screen: "moments",
  },
  {
    icon: require("../../../assets/icon/calendar_icon.png"),
    screen: "todo",
  },
  {
    icon: require("../../../assets/icon/setting_icon.png"),
    screen: "settings",
  },
];
interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const MiniDrawerContent = ({ navigation }: any) => {
  const progress = useDrawerProgress();
  const { themeName } = useTheme();
  const styles = createStyles(themeName);

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const translateY = interpolate(progress.value, [0, 1], [30, 0]);
          const opacity = interpolate(progress.value, [0, 1], [0, 1]);
          return {
            transform: [{ translateY }],
            opacity,
          };
        });

        return (
          <Animated.View
            key={index}
            style={[styles.iconWrapper, animatedStyle]}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(item.screen)}
              style={styles.button}
            >
              <Image source={item.icon} style={styles.icon} />
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};
const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundSecoundary,
      alignItems: "center",
      paddingTop: 40,
    },
    iconWrapper: {
      marginVertical: 20,
    },
    button: {
      padding: 10,
      borderRadius: 30,
      elevation: 5,
    },
    icon: {
      height: 24,
      width: 24,
    },
  });
};

export default MiniDrawerContent;
