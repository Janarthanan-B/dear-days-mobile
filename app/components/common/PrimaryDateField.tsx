import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Dimensions, Platform, Pressable, StyleSheet } from "react-native";
import { TextField } from "react-native-ui-lib";

interface PrimaryDateFieldProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

const screenWidth = Dimensions.get("window").width;

const PrimaryDateField: React.FC<PrimaryDateFieldProps> = ({
  value,
  onChange,
  placeholder = "Select Date",
}) => {
  const { themeName } = useTheme();
  const theme = Colors[themeName];
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
      <TextField
        label={placeholder}
        containerStyle={styles.container}
        value={value}
        editable={false}
        labelColor={theme.textPrimary}
        labelStyle={styles.label}
        fieldStyle={styles.fieldStyle}
        style={styles.input}
        placeholderTextColor={theme.textSecondary}
        trailingAccessory={
          <Pressable onPress={() => setShowPicker(true)} hitSlop={10}>
            <Ionicons name="calendar" size={22} color={theme.textPrimary} />
          </Pressable>
        }
      />

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
    container: {
      width: "100%",
      maxHeight: 60,
      maxWidth: screenWidth - 90,
    },
    input: {
      height: 36,
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

export default PrimaryDateField;
