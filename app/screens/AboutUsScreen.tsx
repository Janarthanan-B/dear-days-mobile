import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenTemplate from "../components/templates/ScreenTemplate";

const AboutUsScreen = () => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);
  return (
    <ScreenTemplate title={text.Terms.aboutUs}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headline}>{text.Terms.aboutUsDetails}</Text>
        <Text style={styles.headlineSub}>{text.Terms.contact}</Text>
        <Text style={styles.subText}>{text.Terms.designBy}</Text>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => {
            Linking.openURL("https://www.linkedin.com/in/sandhya-nallusamy/");
          }}
        >
          <Ionicons
            name="logo-linkedin"
            size={24}
            color={theme.textSecondary}
          />
          <Text style={styles.link}>Linked In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => {
            Linking.openURL("https:www.behance.net/sandhyanallusamy");
          }}
        >
          <Ionicons name="logo-behance" size={24} color={theme.textSecondary} />
          <Text style={styles.link}>Behance</Text>
        </TouchableOpacity>
        <View style={styles.gap}></View>
        <Text style={styles.subText}>{text.Terms.codeBy}</Text>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => {
            Linking.openURL("https:www.linkedin.com/in/janarthanan-developer");
          }}
        >
          <Ionicons
            name="logo-linkedin"
            size={24}
            color={theme.textSecondary}
          />
          <Text style={styles.link}>Linked In</Text>
        </TouchableOpacity>
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
      fontFamily: "Roboto_500Medium",
      paddingBottom: 48,
    },
    headlineSub: {
      fontSize: 18,
      color: theme.textPrimary,
      textAlign: "center",
      fontFamily: "Roboto_500Medium",
      paddingBottom: 46,
    },
    subText: {
      fontSize: 18,
      color: theme.primary,
      //textAlign: "center",
      fontFamily: "Roboto_500Medium",
      letterSpacing: 0,
      paddingBottom: 12,
    },
    link: {
      fontSize: 16,
      color: theme.textSecondary,

      textAlign: "left",
      fontFamily: "Roboto_300Light",
      //letterSpacing: 0,
      textDecorationLine: "underline",
      fontStyle: "italic",
    },
    wrapper: {
      padding: 6,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    gap: {
      marginBottom: 12,
    },
  });
};
export default AboutUsScreen;
