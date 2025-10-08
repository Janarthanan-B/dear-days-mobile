import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface PrimaryDateFieldProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

const screenWidth = Dimensions.get("window").width;

const PrimaryDateField: React.FC<PrimaryDateFieldProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);

  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      onChange(formattedDate);
    }
  };

  return (
    <>
      <View style={styles.fieldStyleContainer}>
        <Text style={styles.label}>{placeholder}</Text>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.text}>{value}</Text>
          <Pressable onPress={() => setShowPicker(true)} hitSlop={10}>
            <Ionicons name="calendar" size={22} color={theme.textPrimary} />
          </Pressable>
        </View>
      </View>
      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeDate}
        />
      )}
    </>
  );
};

const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    label: {
      fontFamily: "Roboto_500Medium",
      letterSpacing: 0,
      fontSize: 16,
      paddingBottom: 6,
      textAlign: "left",
      color: theme.textPrimary,
    },
    fieldStyleContainer: {
      width: "100%",
      maxWidth: screenWidth - 90,
      height: 60,
    },
    inputFieldContainer: {
      width: "100%",
      maxWidth: screenWidth - 90,
      borderWidth: 1,
      borderRadius: 12,

      paddingHorizontal: 6,
      color: theme.textSecondary,
      borderColor: theme.borderPrimary,
      height: 36,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    text: {
      fontFamily: "Roboto_300Light",
      letterSpacing: 0,
      fontSize: 16,
      textAlign: "left",
    },
  });
};
export default PrimaryDateField;
