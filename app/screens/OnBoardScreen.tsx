import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CoupleInLove from "../../assets/images/couple-in-love.svg";
import { useThemedStyles } from "@/hooks/ThemeContext";

const { width, height } = Dimensions.get("screen");

export default function OnBoardScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#FFFFF" translucent={true} />
        <View
          style={{
            flex: 1,
            height: height,
            width: width,
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <View style={{ flex: 1, backgroundColor: "white" }} />
          <View style={{ flex: 1, backgroundColor: "white" }} />
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CoupleInLove />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = useThemedStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundPrimary + "CC",
    },
    title: {
      fontSize: 28,
      color: theme.textPrimary,
    },
  })
);
