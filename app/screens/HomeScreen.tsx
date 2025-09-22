// screens/DashboardScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import AddImageModal from "../components/AddImageModel";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigatorParamsList } from "../index";

type HomeProps = NativeStackScreenProps<RootNavigatorParamsList, "home">;

const HomeScreen: React.FC<HomeProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1400&q=80",
      }}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      {/* Dark overlay */}
      <View style={styles.overlay} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>DEAR DAYS ❤️</Text>
        <TouchableOpacity onPress={() => navigation.navigate("memory")}>
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Floating Heart Icon */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="heart" size={36} color="white" />
      </TouchableOpacity>

      {/* Modal for image upload */}
      <AddImageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-between",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
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
