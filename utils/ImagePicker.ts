import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const pickImage = async (): Promise<string | null> => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert(
      "Permission required",
      "Permission to access gallery is required!"
    );
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
    aspect: [1, 1],
    quality: 1,
    allowsMultipleSelection: false,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
  return null;
};
