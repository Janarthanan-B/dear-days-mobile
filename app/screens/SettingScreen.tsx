import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { useTheme } from "@/hooks/ThemeContext";
import { pickImage } from "@/utils/ImagePicker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryTextField from "../components/common/PrimaryTextField";
import ScreenTemplate from "../components/templates/ScreenTemplate";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CheckboxInput from "../components/common/CheckboxInput";
import { MainNavigatorParamsList } from "../index";
import PrimaryLoader from "../components/common/CoupleLoader";
import { registerForPushNotificationsAsync } from "@/utils/Notification";

type Props = NativeStackScreenProps<MainNavigatorParamsList, "settings">;

const SettingScreen: React.FC<Props> = ({ navigation }) => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);

  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    } catch (error) {
      console.log("Error loading data:", error);
    }
  };

  const pickData = async () => {
    const image = await pickImage();
    if (image) {
      setProfileImage(image);
      await AsyncStorage.setItem("@profileImage", image);
    }
  };

  const handleTextChange = async (key: string, value: string) => {
    if (key === "userName") setUserName(value);
    if (key === "partnerName") setPartnerName(value);
    await AsyncStorage.setItem(`@${key}`, value);
  };

  const toggleNotification = async (value: boolean) => {
    if (value) {
      const granted = await registerForPushNotificationsAsync();
      setNotificationsEnabled(granted);
      await AsyncStorage.setItem(
        "@notificationsEnabled",
        JSON.stringify(granted)
      );
    } else {
      setNotificationsEnabled(value);
      await AsyncStorage.setItem(
        "@notificationsEnabled",
        JSON.stringify(value)
      );
    }
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
            navigation.dispatch(StackActions.replace("welcome"));
          },
        },
      ]
    );
  };

  return (
    <ScreenTemplate title={text.Setting.settings}>
      {isLoading ? (
        <PrimaryLoader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image
              source={require("../../assets/icon/setting_dd_icon.png")}
              style={styles.settingIcon}
            />
            <View style={styles.detailContainer}>
              <View style={styles.profileContainer}>
                <View style={styles.profileImageWrapper}>
                  <Image
                    source={
                      profileImage
                        ? { uri: profileImage }
                        : require("../../assets/images/default_profile.png")
                    }
                    style={styles.profileImage}
                    borderRadius={60}
                  />
                  <TouchableOpacity
                    style={styles.editIconContainer}
                    onPress={pickData}
                  >
                    <Image
                      source={require("../../assets/icon/edit_circle_icon.png")}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.segmentContainer}>
                <PrimaryTextField
                  placeholder={text.OnBoard.yourName}
                  value={userName}
                  onChangeText={(value) => handleTextChange("userName", value)}
                  required
                />
              </View>
              <View style={styles.segmentContainer}>
                <PrimaryTextField
                  placeholder={text.OnBoard.yourPartnerName}
                  value={partnerName}
                  onChangeText={(value) =>
                    handleTextChange("partnerName", value)
                  }
                  required
                />
              </View>
              <View style={styles.segmentContainer}>
                <Text style={styles.label}>
                  {text.Setting.enableNotification}
                </Text>
                <CheckboxInput
                  checked={notificationsEnabled}
                  color={theme.primary}
                  onChange={toggleNotification}
                />
              </View>
              <TouchableOpacity
                style={styles.segmentContainer}
                onPress={() => navigation.navigate("aboutUs")}
              >
                <Text style={styles.label}>{text.Terms.aboutUs}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={theme.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.segmentContainer}
                onPress={() => navigation.navigate("termsPolicy")}
              >
                <Text style={styles.label}>{text.Terms.terms_Policy}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={deleteAccount}>
            <Text style={styles.deleteText}>{text.Setting.deleteAccount}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </ScreenTemplate>
  );
};

const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    loader: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
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
    },
    icon: {
      width: 24,
      height: 24,
    },
    settingIcon: {
      width: "100%",
      height: 100,
      borderRadius: 20,
      marginBottom: 16,
    },
    detailContainer: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.backgroundAlter,
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
      paddingBottom: 8,
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
