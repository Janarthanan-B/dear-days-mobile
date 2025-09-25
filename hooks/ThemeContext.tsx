import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Colors } from "../constants/theme";

type ThemeName = "light" | "dark";
type Theme = typeof Colors.light;

type ThemeContextType = {
  themeName: ThemeName;
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  themeName: "light",
  theme: Colors.light,
  toggleTheme: () => {},
});

const THEME_KEY = "APP_THEME";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  // 🔁 Load saved theme from AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (storedTheme === "dark" || storedTheme === "light") {
          setThemeName(storedTheme);
        }
      } catch (e) {
        console.log("Failed to load theme:", e);
      }
    })();
  }, []);

  // 💾 Save theme to AsyncStorage
  const toggleTheme = async () => {
    const newTheme = themeName === "light" ? "dark" : "light";
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
    } catch (e) {
      console.log("Failed to save theme:", e);
    }
    setThemeName(newTheme);
  };

  const theme = Colors[themeName];

  return (
    <ThemeContext.Provider value={{ themeName, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
