import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MemoryScreen from "./screens/MemoryScreen";
import SplashScreen from "./screens/SplashScreen";
import OnBoardScreen from "./screens/OnBoardScreen";

export type RootNavigatorParamsList = {
  splash: undefined;
  onBoard: undefined;
  home: undefined;
  memory: undefined;
  todo: undefined;
};
const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();

export default function Index() {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="splash"
    >
      <RootStack.Screen name="splash" component={SplashScreen} />
      <RootStack.Screen name="onBoard" component={OnBoardScreen} />
      <RootStack.Screen name="home" component={HomeScreen} />
      <RootStack.Screen name="memory" component={MemoryScreen} />
    </RootStack.Navigator>
  );
}
