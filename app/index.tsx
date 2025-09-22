import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MemoryScreen from "./screens/MemoryScreen";

export type RootNavigatorParamsList = {
  splash: undefined;
  onBoad: undefined;
  home: undefined;
  memory: undefined;
  todo: undefined;
};
const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();

export default function Index() {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="home"
    >
      <RootStack.Screen name="home" component={HomeScreen} />
      <RootStack.Screen name="memory" component={MemoryScreen} />
    </RootStack.Navigator>
  );
}
