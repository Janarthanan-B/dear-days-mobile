import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";

type Props = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: number;
  color?: string;
  testID?: string;
};

const CheckboxInput: React.FC<Props> = ({
  checked = false,
  onChange = () => {},
  disabled = false,
  color,
  testID,
}) => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);
  const iconName = checked ? "checkbox-marked" : "checkbox-blank-outline";

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) return;
    onChange(!checked);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        pressed && !disabled ? styles.pressed : null,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      testID={testID}
    >
      <MaterialCommunityIcons
        name={iconName as any}
        size={24}
        color={disabled ? theme.textInfo : color}
      />
    </Pressable>
  );
};

export default CheckboxInput;

const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    pressed: {
      opacity: 0.75,
    },
  });
};
