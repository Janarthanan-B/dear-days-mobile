import { Colors, GenderColors, Gender } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function useGenderThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light,
  gender: Gender = "female"
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  // First check gender-specific override
  const genderColor = GenderColors[gender]?.[theme]?.[colorName];
  if (genderColor) {
    return genderColor;
  }

  // Fallback to default theme color
  return Colors[theme][colorName];
}
