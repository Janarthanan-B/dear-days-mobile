import { useGenderThemeColor } from "@/hooks/use-gender-color";
import { Text } from "react-native";

export default function ColorText({ children }: { children: string }) {
  const gender = "female";
  const textColor = useGenderThemeColor({}, "text", gender);

  return <Text style={{ color: textColor }}>{children}</Text>;
}
