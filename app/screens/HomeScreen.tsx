// screens/DashboardScreen.js
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenMenuModal from "../components/ScreenModel";
import { MainNavigatorParamsList } from "../index";

type HomeProps = NativeStackScreenProps<MainNavigatorParamsList, "home">;

const HomeScreen: React.FC<HomeProps> = ({ navigation }) => {
  const [addImageVisible, setAddImageVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text>Dear Days ❤️</Text>
        <ScreenMenuModal />
      </View>

      {/* Floating Heart FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setAddImageVisible(true)}
      >
        <Ionicons name="heart" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0000",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0000",
  },
  topBar: {
    marginTop: 50,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#ff4d6d",
    padding: 20,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 10,
  },
});

export default HomeScreen;
