// CustomTextField.tsx
import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

interface CustomTextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  validate?: (value: string) => boolean | string;
  required?: boolean;
  maxLength?: number;
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
  required = false,
  keyboardType = "default",
  multiline = false,
  maxLength = multiline ? 500 : 50,
}) => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);

  const [text, setText] = useState(value);
  const [isError, setIsError] = useState(false);
  const onChange = (str: string) => {
    setText(str);
    onChangeText(str);
    if (isError) setIsError(false);
  };

  const onBlur = () => {
    if (required) {
      if (text == "") setIsError(true);
    }
  };

  return (
    <View
      style={[styles.fieldStyleContainer, { height: multiline ? 150 : 60 }]}
    >
      <Text
        style={[
          styles.label,
          { color: isError ? theme.error : theme.textPrimary },
        ]}
      >
        {placeholder}
      </Text>
      <TextInput
        style={[
          styles.inputFieldContainer,
          { height: multiline ? 126 : 36 },
          { borderColor: isError ? theme.error : theme.borderPrimary },
        ]}
        selectionColor={theme.textSecondary}
        value={text}
        onChangeText={onChange}
        multiline={multiline}
        maxLength={maxLength}
        keyboardType={keyboardType}
        onBlur={onBlur}
      />
    </View>
  );
};

export default PrimaryTextField;
const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    label: {
      fontFamily: "Roboto_500Medium",
      letterSpacing: 0,
      fontSize: 16,
      paddingBottom: 6,
      textAlign: "left",
    },
    fieldStyleContainer: {
      width: "100%",
      maxWidth: screenWidth - 90,
    },
    inputFieldContainer: {
      width: "100%",
      maxWidth: screenWidth - 90,
      borderWidth: 1,
      borderRadius: 12,
      fontFamily: "Roboto_300Light",
      letterSpacing: 0,
      fontSize: 16,
      paddingHorizontal: 6,
      color: theme.textSecondary,
    },
  });
};
