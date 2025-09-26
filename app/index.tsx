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
import { ActivityIndicator, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import OnBoardScreen from "./screens/OnBoardScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MiniDrawerContent from "./components/MiniDrawerContent";
import MomentsScreen from "./screens/MomentsScreen";
import SettingScreen from "./screens/SettingScreen";
import TodoScreen from "./screens/TodoScreen";
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
};

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();
const Drawer = createDrawerNavigator<MainNavigatorParamsList>();

export default function Index() {
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
        initialRouteName="splash"
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
      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
};
