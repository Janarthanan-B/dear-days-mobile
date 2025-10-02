// CustomTextField.tsx
import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TextField } from "react-native-ui-lib";

interface CustomTextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  validate?: (value: string) => boolean | string;
  errorMessage?: string;
  enableErrors?: boolean;
  showCharCounter?: boolean;
  maxLength?: number;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad";
  multiline?: boolean;
}
const screenWidth = Dimensions.get("window").width;

const PrimaryTextField: React.FC<CustomTextFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  validate,
  errorMessage,
  enableErrors = true,
  showCharCounter = false,
  secureTextEntry = false,
  keyboardType = "default",
  multiline = false,
  maxLength = multiline ? 500 : 50,
}) => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);
  return (
    <TextField
      style={styles.input}
      containerStyle={[styles.container, { maxHeight: multiline ? 150 : 60 }]}
      label={placeholder}
      labelColor={theme.textPrimary}
      labelStyle={styles.label}
      //placeholder={placeholder}
      placeholderTextColor={theme.textPrimary}
      value={value}
      onChangeText={onChangeText}
      //validate={validate}
      //errorMessage={errorMessage}
      //enableErrors={enableErrors}
      showCharCounter={showCharCounter}
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      fieldStyle={[styles.fieldStyle, { height: multiline ? 126 : 36 }]}
      selectionColor={theme.textSecondary}
      multiline={multiline}
    />
  );
};

export default PrimaryTextField;
const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    container: {
      width: "100%",

      maxWidth: screenWidth - 90,
    },
    input: {
      height: 30,
      fontSize: 16,
      fontFamily: "Roboto_300Light",
      letterSpacing: 0,
      color: theme.textSecondary,
    },
    label: {
      fontFamily: "Roboto_500Medium",
      letterSpacing: 0,
      fontSize: 16,
      paddingBottom: 8,
    },
    fieldStyle: {
      borderWidth: 1,
      borderColor: theme.borderPrimary,
      borderRadius: 12,
      paddingHorizontal: 8,
    },
  });
};
