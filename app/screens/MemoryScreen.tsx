import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MemoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Other Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
