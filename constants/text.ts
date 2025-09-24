// import { NativeModules, Platform } from "react-native";

// ex: interpolate("Are you sure you want to finalize {name}?", { name: providerName });
export function interpolate(
  text: string,
  replacements: Record<string, string>
): string {
  return text.replace(/\{\w+\}/g, (m) => {
    const key = m.substring(1, m.length - 1);
    return replacements[key];
  });
}

import en from "./lang/en.json";

// Currently we go with English only
// let locale = 'en';
// if (Platform.OS === 'ios') {
//   locale =
//     NativeModules.SettingsManager?.settings?.AppleLocale ||
//     NativeModules.SettingsManager?.settings?.AppleLanguages[0];
// } else {
//   locale = NativeModules.I18nManager?.localeIdentifier;
// }

const text: Record<string, Record<string, string>> = en;

export default text;
