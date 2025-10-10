import { ThemeProvider } from "@/hooks/ThemeContext";
import {
  ComicNeue_300Light,
  ComicNeue_400Regular,
  ComicNeue_700Bold,
} from "@expo-google-fonts/comic-neue";
import {
  Roboto_300Light,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import OnBoardScreen from "./screens/OnBoardScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useEffect, useState } from "react";
import MiniDrawerContent from "./components/templates/MiniDrawerContent";
import MomentsScreen from "./screens/MomentsScreen";
import SettingScreen from "./screens/SettingScreen";
import TodoScreen from "./screens/TodoScreen";

import { getDaysTogether } from "@/utils/DateUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import AboutUsScreen from "./screens/AboutUsScreen";
import TermsPolicyScreen from "./screens/TermsPolicyScreen";
import {
  registerForPushNotificationsAsync,
  scheduleDailyNotification,
} from "@/utils/Notification";

export type RootNavigatorParamsList = {
  splash: undefined;
  welcome: undefined;
  onBoard: undefined;
  register: undefined;
  main: NavigatorScreenParams<MainNavigatorParamsList>;
};

export type MainNavigatorParamsList = {
  home: undefined;
  moments: undefined;
  todo: undefined;
  settings: undefined;
  aboutUs: undefined;
  termsPolicy: undefined;
};

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();
const Drawer = createDrawerNavigator<MainNavigatorParamsList>();

export default function Index() {
  const milestoneKeyStore = "@milestones";
  const [screen, SetScreen] = useState<"splash" | "main">("splash");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await AsyncStorage.getItem(milestoneKeyStore);
    if (data != null) {
      SetScreen("main");
      const granted = await registerForPushNotificationsAsync();
      const storedNotifications = await AsyncStorage.getItem(
        "@notificationsEnabled"
      );
      if (
        granted &&
        storedNotifications != null &&
        JSON.parse(storedNotifications)
      ) {
        scheduleDailyNotification(
          9,
          0,
          JSON.parse(data)[0].description,
          JSON.parse(data)[0].description
        );
      }
    }
  };

  const [fontsLoaded] = useFonts({
    ComicNeue_300Light,
    ComicNeue_400Regular,
    ComicNeue_700Bold,
    Roboto_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading fonts...</Text>
      </View>
    );
  }
  return (
    <ThemeProvider>
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={screen}
      >
        <RootStack.Screen name="splash" component={SplashScreen} />
        <RootStack.Screen name="welcome" component={WelcomeScreen} />
        <RootStack.Screen name="onBoard" component={OnBoardScreen} />
        <RootStack.Screen name="register" component={RegisterScreen} />
        <RootStack.Screen name="main" component={MainStack} />
      </RootStack.Navigator>
    </ThemeProvider>
  );
}

const MainStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={(props) => <MiniDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          overlayColor: "transparent",
          drawerStyle: {
            width: 80, // 👈 Only icons visible
            backgroundColor: "#ffe6eb",
          },
        }}
      >
        <Drawer.Screen name="home" component={HomeScreen} />
        <Drawer.Screen name="moments" component={MomentsScreen} />
        <Drawer.Screen name="todo" component={TodoScreen} />
        <Drawer.Screen name="settings" component={SettingScreen} />
        <Drawer.Screen name="aboutUs" component={AboutUsScreen} />
        <Drawer.Screen name="termsPolicy" component={TermsPolicyScreen} />
      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
};
