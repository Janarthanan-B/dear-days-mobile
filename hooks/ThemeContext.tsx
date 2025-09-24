import { createContext, useContext, useState, ReactNode } from "react";

import { StyleSheet } from "react-native";
import { Colors } from "../constants/theme";

type ThemeName = "light" | "dark";
type Theme = typeof Colors.light;

type ThemeContextType = {
  themeName: ThemeName;
  theme: typeof Colors.light;
  toggleTheme: () => void;
};

// ✅ Safe default values to satisfy TypeScript
const defaultValue: ThemeContextType = {
  themeName: "light",
  theme: Colors.light,
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultValue);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = Colors[themeName];

  return (
    <ThemeContext.Provider value={{ themeName, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export function useThemedStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(stylesFn: (theme: Theme) => T): T {
  const { theme } = useTheme();
  return stylesFn(theme);
}
