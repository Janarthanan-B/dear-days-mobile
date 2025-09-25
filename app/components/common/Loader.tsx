import { useTheme } from "@/hooks/ThemeContext";
import React, { FC } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

const Loader: FC = () => {
  const { theme } = useTheme();
  return (
    <ActivityIndicator
      size="large"
      color={theme.primary}
      style={Styles.container}
    />
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loader;
