import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { Milestone } from "@/data/Milestone";
import { useTheme } from "@/hooks/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CoupleFloatingBallons from "../../assets/images/couple-floating-balloons.svg";
import PrimaryButton from "../components/common/PrimaryButton";
import PrimaryDateField from "../components/common/PrimaryDateField";
import PrimaryTextField from "../components/common/TextField";
import { RootNavigatorParamsList } from "../index";

const { width, height } = Dimensions.get("screen");
type Props = NativeStackScreenProps<RootNavigatorParamsList, "onBoard">;

const OnBoardScreen: React.FC<Props> = ({ navigation }) => {
  const { themeName } = useTheme();
  const styles = createStyles(themeName);
  const milestoneKeyStore = "@milestones";

  const [name, setName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [date, setDate] = useState("");

  const onButtonClick = async () => {
    await AsyncStorage.setItem(`@userName`, name);
    await AsyncStorage.setItem(`@partnerName`, partnerName);
    const newMileStone: Milestone = {
      id: Date.now().toString().toString(),
      description: "together",
      date,
      photo: "",
      createdAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(
      milestoneKeyStore,
      JSON.stringify([newMileStone])
    );
    navigation.dispatch(StackActions.replace("register"));
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.formConatiner}>
          <Text style={styles.welcomeHeader}>{text.OnBoard.aboutYou}</Text>
          <PrimaryTextField
            placeholder={text.OnBoard.yourName}
            value={name}
            onChangeText={setName}
          />
          <PrimaryTextField
            placeholder={text.OnBoard.yourPartnerName}
            value={partnerName}
            onChangeText={setPartnerName}
          />
          <PrimaryDateField
            placeholder={text.OnBoard.whenTogether}
            value={date}
            onChange={setDate}
          />
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.button}>
            <PrimaryButton
              title={text.Navigation.next}
              onPress={onButtonClick}
              disabled={name == "" || partnerName == "" || date == ""}
            />
          </View>
          <CoupleFloatingBallons />
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
      gap: 24,
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
      fontFamily: "Roboto_500Medium",
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

export default OnBoardScreen;
