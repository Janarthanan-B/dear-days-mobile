import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CoupleInLove from "../../assets/images/couple-in-love.svg";
import PrimaryButton from "../components/common/PrimaryButton";

import { StackActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigatorParamsList } from "../index";

const { width, height } = Dimensions.get("screen");
type Props = NativeStackScreenProps<RootNavigatorParamsList, "welcome">;

const WelocmeScreen: React.FC<Props> = ({ navigation }) => {
  const { themeName } = useTheme();
  const styles = createStyles(themeName);

  const onButtonClick = () => {
    navigation.dispatch(StackActions.replace("onBoard"));
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.formConatiner}>
          <Text style={styles.welcomeHeader}>{text.Common.welcome}</Text>
          <Text style={styles.welcomeNote}>{text.Common.welcomeNote}</Text>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.button}>
            <PrimaryButton
              title={text.Navigation.continue}
              onPress={onButtonClick}
            />
          </View>
          <CoupleInLove />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      height: height,
      width: width,
      padding: 24,
    },
    title: {
      fontSize: 28,
      color: theme.textPrimary,
    },
    formConatiner: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      paddingVertical: 24,
      width: "100%",
    },
    imageContainer: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
    },
    welcomeHeader: {
      fontSize: 28,
      color: theme.textPrimary,
      textAlign: "center",
      fontFamily: "Roboto_700Bold",
      letterSpacing: 0,
      paddingBottom: 24,
    },
    welcomeNote: {
      fontSize: 16,
      color: theme.primary,
      textAlign: "center",
      fontFamily: "Roboto_500Medium",
      letterSpacing: 0,
      paddingBottom: 24,
    },
  });
};

export default WelocmeScreen;
