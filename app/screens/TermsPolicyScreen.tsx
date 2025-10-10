import {
  PRIVACY_POLICY_TEXT,
  TERMS_OF_USE_TEXT,
} from "@/constants/lang/TermsPolicy";
import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import ScreenTemplate from "../components/templates/ScreenTemplate";

const TermsPolicyScreen = () => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);
  return (
    <ScreenTemplate title={text.Terms.terms_Policy}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.subText}>Privacy Policy</Text>
        <Text style={styles.headlineSub}>Last updated: 10/14/2025</Text>
        <Text style={styles.headline}>{PRIVACY_POLICY_TEXT}</Text>
        <Text style={styles.subText}>Terms & Conditions</Text>
        <Text style={styles.headlineSub}>Last updated: 10/14/2025</Text>
        <Text style={styles.headline}>{TERMS_OF_USE_TEXT}</Text>
      </ScrollView>
    </ScreenTemplate>
  );
};
const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    headline: {
      fontSize: 18,
      color: theme.textPrimary,
      textAlign: "justify",
      fontFamily: "Roboto_300Light",
      paddingBottom: 12,
    },
    headlineSub: {
      fontSize: 18,
      color: theme.textPrimary,
      textAlign: "center",
      fontFamily: "Roboto_500Medium",
      paddingBottom: 12,
    },
    subText: {
      fontSize: 18,
      color: theme.primary,
      //textAlign: "center",
      fontFamily: "Roboto_500Medium",
      letterSpacing: 0,
      paddingBottom: 12,
    },
  });
};
export default TermsPolicyScreen;
