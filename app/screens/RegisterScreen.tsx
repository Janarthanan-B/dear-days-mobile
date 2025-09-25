import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CoupleBicycle from "../../assets/images/couple-bicycle.svg";

import { StackActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigatorParamsList } from "../index";

const { width, height } = Dimensions.get("screen");
type Props = NativeStackScreenProps<RootNavigatorParamsList, "register">;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { themeName } = useTheme();
  const styles = createStyles(themeName);

  const onSgnUpClick = () => {
    navigation.dispatch(StackActions.replace("home"));
  };

  const onGuestClick = () => {
    navigation.dispatch(StackActions.replace("home"));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.formConatiner}>
          <View style={styles.formConatinerInfo}>
            <Text style={styles.welcomeHeader}>{text.Register.almostDone}</Text>
            <Text style={styles.welcomeNote}>{text.Register.registerInfo}</Text>
          </View>
          <View style={styles.formConatinerInfo}>
            <TouchableOpacity
              style={styles.button}
              accessibilityLabel={`Google SignUP Button`}
              onPress={onSgnUpClick}
            >
              <Image
                source={require("../../assets/icon/icon_google.png")}
                style={styles.icon}
              />
              <Text style={styles.buttonText}>{text.Register.signUp}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={onGuestClick}
          >
            <Text style={styles.welcomeNote}>{text.Register.continue}</Text>
          </TouchableOpacity>
          <CoupleBicycle />
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
      width: "100%",
    },
    formConatinerInfo: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
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
    },
    button: {
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      borderRadius: 25,
      borderWidth: 2,
      borderColor: theme.borderPrimary,
      height: 46,
      width: "100%",
      paddingHorizontal: 25,
      maxWidth: width - 90,
      marginTop: 24,
      flexDirection: "row",
    },
    icon: {
      height: 16,
      width: 16,
      marginRight: 16,
    },
    buttonText: {
      textTransform: "capitalize",
      fontFamily: "Roboto_500Medium",
      fontSize: 20,
      color: theme.textPrimary,
    },
    continueButton: {
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      padding: 24,
    },
  });
};

export default RegisterScreen;
