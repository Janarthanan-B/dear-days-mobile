import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Switch } from "react-native-ui-lib";
import PrimaryTextField from "../components/common/TextField";
import ScreenTemplate from "../components/templates/ScreenTemplate";

const SettingScreen = () => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem("@userName");
      const storedPartnerName = await AsyncStorage.getItem("@partnerName");
      const storedNotifications = await AsyncStorage.getItem(
        "@notificationsEnabled"
      );
      const storedProfileImage = await AsyncStorage.getItem("@profileImage");

      if (storedUserName) setUserName(storedUserName);
      if (storedPartnerName) setPartnerName(storedPartnerName);
      if (storedNotifications)
        setNotificationsEnabled(JSON.parse(storedNotifications));
      if (storedProfileImage) setProfileImage(storedProfileImage);
    } catch (error) {
      console.log("Error loading data:", error);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access gallery is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      await AsyncStorage.setItem("@profileImage", result.assets[0].uri);
    }
  };

  const handleTextChange = async (key: string, value: string) => {
    if (key === "userName") setUserName(value);
    if (key === "partnerName") setPartnerName(value);
    await AsyncStorage.setItem(`@${key}`, value);
  };

  const deleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            setUserName("");
            setPartnerName("");
            setProfileImage("");
            setNotificationsEnabled(false);
          },
        },
      ]
    );
  };

  return (
    <ScreenTemplate title={text.Setting.settings}>
      <View style={styles.container}>
        <View
          style={[
            styles.detailContainer,
            { backgroundColor: theme.backgroundSplash, marginBottom: 24 },
          ]}
        >
          <Text style={styles.logoText}>DD</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageWrapper}>
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("../../assets/icon/default_profile_icon.png")
                }
                style={styles.profileImage}
                borderRadius={60}
              />
              <TouchableOpacity
                style={styles.editIconContainer}
                onPress={pickImage}
              >
                <Image
                  source={require("../../assets/icon/edit_circle_icon.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <PrimaryTextField
            placeholder={text.OnBoard.yourName}
            value={userName}
            onChangeText={(value) => handleTextChange("userName", value)}
          />
          <PrimaryTextField
            placeholder={text.OnBoard.yourPartnerName}
            value={partnerName}
            onChangeText={(value) => handleTextChange("partnerName", value)}
          />
          <View style={styles.segmentContainer}>
            <Text style={styles.label}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onColor={theme.primary}
              offColor={theme.disable}
              onValueChange={async (value) => {
                setNotificationsEnabled(value);
                await AsyncStorage.setItem(
                  "@notificationsEnabled",
                  JSON.stringify(value)
                );
              }}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={deleteAccount}>
        <Text style={styles.deleteText}>{text.Setting.deleteAccount}</Text>
      </TouchableOpacity>
    </ScreenTemplate>
  );
};

const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    profileContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    profileImageWrapper: {
      position: "relative",
    },
    profileImage: {
      width: 120,
      height: 120,
      backgroundColor: theme.primary,
    },
    editIconContainer: {
      position: "absolute",
      bottom: 0,
      right: 0,
      borderRadius: 20,
      padding: 8,
      ...Platform.select({
        ios: {
          shadowColor: theme.overlay,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    icon: {
      width: 24,
      height: 24,
    },
    detailContainer: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.backgroundPrimary,
      borderRadius: 20,
      gap: 16,
      paddingHorizontal: 8,
      paddingVertical: 16,
      ...Platform.select({
        ios: {
          shadowColor: theme.overlay,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    segmentContainer: {
      height: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    label: {
      fontFamily: "Roboto_500Medium",
      letterSpacing: 0,
      fontSize: 16,
    },
    deleteButton: {
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      padding: 24,
    },
    deleteText: {
      fontSize: 16,
      color: theme.primary,
      textAlign: "center",
      fontFamily: "Roboto_500Medium",
      letterSpacing: 0,
    },
    logoText: {
      fontSize: 64,
      color: theme.primary,
      textAlign: "center",
      fontFamily: "ComicNeue_700Bold",
      letterSpacing: 0,
    },
  });
};
export default SettingScreen;
