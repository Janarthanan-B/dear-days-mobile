import { MainNavigatorParamsList } from "@/app";
import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useDrawerProgress } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface TitleTemplateProps {
  title: string;
  onAddClick?: () => void;
  addButton?: boolean;
  children?: React.ReactNode;
}
const { width, height } = Dimensions.get("screen");
type MainNav = NativeStackNavigationProp<MainNavigatorParamsList>;

const ScreenTemplate: React.FC<TitleTemplateProps> = ({
  title,
  addButton = false,
  onAddClick,
  children,
}) => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);
  const navigation = useNavigation<MainNav>();
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Ionicons name="menu" size={24} color={theme.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            {addButton ? (
              <TouchableOpacity style={styles.plusBtn} onPress={onAddClick}>
                <Ionicons name="add-circle" size={26} color={theme.primary} />
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
          </View>
          <View style={styles.screenConatiner}>{children}</View>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.backgroundSecoundary,
    },
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      height: height,
      width: width,
      padding: 24,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.backgroundPrimary,
    },
    menuBtn: {
      //padding: 8,
    },
    menuIcon: {
      fontSize: 30,
      color: theme.primary,
      letterSpacing: 0,
    },
    headerTitle: {
      fontSize: 24,
      color: theme.primary,
      textAlign: "center",
      fontFamily: "Roboto_500Medium",
      letterSpacing: 0,
    },
    plusBtn: {
      borderRadius: 20,
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    plusIcon: {
      fontSize: 20,
      color: theme.backgroundPrimary,
    },
    screenConatiner: {
      flex: 1,
      padding: 24,
      backgroundColor: theme.backgroundPrimary,
    },
  });
};

export default ScreenTemplate;
