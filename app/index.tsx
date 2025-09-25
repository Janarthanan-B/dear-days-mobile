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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { ActivityIndicator, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import MemoryScreen from "./screens/MemoryScreen";
import OnBoardScreen from "./screens/OnBoardScreen";
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export type RootNavigatorParamsList = {
  splash: undefined;
  welcome: undefined;
  onBoard: undefined;
  home: undefined;
  memory: undefined;
  todo: undefined;
};
const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();

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
        <RootStack.Screen name="home" component={HomeScreen} />
        <RootStack.Screen name="memory" component={MemoryScreen} />
      </RootStack.Navigator>
    </ThemeProvider>
  );
}
