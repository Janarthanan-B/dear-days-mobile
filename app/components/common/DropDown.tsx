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
import DropDownPicker from "react-native-dropdown-picker";

interface DropDownProps {
  value: string;
  onChange: (data: any) => void;
  placeholder?: string;
  items: any[];
}

const screenWidth = Dimensions.get("window").width;

const DropDown: React.FC<DropDownProps> = ({
  value,
  onChange,
  placeholder,
  items,
}) => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);

  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={styles.fieldStyleContainer}>
        <Text style={styles.label}>{placeholder}</Text>
        <DropDownPicker
          listMode="SCROLLVIEW"
          value={value}
          items={items}
          setOpen={setOpen}
          open={open}
          setValue={(val) => onChange(val)}
          //setItems={setItems}
          placeholder="Select a milestone..."
          style={styles.inputFieldContainer}
          dropDownContainerStyle={{
            borderRadius: 12,
            borderColor: theme.borderPrimary,
          }}
        />
      </View>
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
export default DropDown;
