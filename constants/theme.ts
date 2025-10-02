export const Colors = {
  light: {
    primary: "#B10667",

    textPrimary: "#000000",
    textSecondary: "#49454F",
    textWhite: "#FFFFFF",
    textInfo: "#938E8E",

    backgroundPrimary: "#FFFFFF",
    backgroundSecoundary: "#FFE9F6",
    backgroundSplash: "#FFD5ED",

    borderPrimary: "#BABABA",

    disable: "#49454F",

    overlay: "rgba(0,0,0,0.5)",
  },
  dark: {
    primary: "#B10667",

    textPrimary: "#000000",
    textSecondary: "#49454F",
    textWhite: "#FFFFFF",
    textInfo: "#938E8E",

    backgroundPrimary: "#FFFFFF",
    backgroundSecoundary: "#FFE9F6",
    backgroundSplash: "#FFD5ED",

    borderPrimary: "#BABABA",

    disable: "#49454F",

    overlay: "rgba(0,0,0,0.5)",
  },
};

export type ThemeName = keyof typeof Colors;
export type Theme = typeof Colors.light; // both light and dark have same shape
