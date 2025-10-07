import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import React, { FC } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
}
const screenWidth = Dimensions.get("window").width;

const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  secondary = false,
  disabled = false,
}) => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);
  return (
    <TouchableOpacity
      style={[
        secondary || disabled
          ? styles.sec_button_container
          : styles.button_container,
      ]}
      disabled={disabled}
      accessibilityLabel={`${title} Button`}
      onPress={onPress}
    >
      <View style={styles.inner_wrapper}>
        <Text
          style={[
            { color: secondary ? theme.textPrimary : theme.backgroundPrimary },
            styles.button_text,
          ]}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    button_container: {
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      borderRadius: 25,
      borderWidth: 2,
      borderColor: theme.primary,
      backgroundColor: theme.primary,
      height: 46,
      width: "100%",
      paddingHorizontal: 25,
      maxWidth: screenWidth - 90, //*as per design perspective
    },
    sec_button_container: {
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      borderRadius: 25,
      borderWidth: 2,
      borderColor: theme.borderPrimary,
      backgroundColor: theme.borderPrimary,
      height: 46,
      width: "100%",
      paddingHorizontal: 25,
      maxWidth: screenWidth - 90,
    },
    disabled_button: {
      backgroundColor: theme.disable,
      borderColor: theme.disable,
    },
    inner_wrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    icon_wrapper: {
      paddingRight: 15,
    },
    icon: {
      width: 19,
    },
    button_text: {
      textTransform: "capitalize",
      fontFamily: "Roboto_500Medium",
      fontSize: 20,
    },
  });
};

export default PrimaryButton;
