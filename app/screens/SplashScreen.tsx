// App.js
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigatorParamsList } from "../index";

const { width, height } = Dimensions.get("screen");

type Props = NativeStackScreenProps<RootNavigatorParamsList, "splash">;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const [showImage, setShowImage] = useState(false);
  const [showExpandedD, setShowExpandedD] = useState(false);
  const [showInitialDD, setShowInitialDD] = useState(true);

  // Animation refs
  const revealAnim = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(1)).current;
  const textPosition = useRef(new Animated.Value(0)).current;
  const letterSpacingAnim = useRef(new Animated.Value(0)).current;

  const earLetters = ["e", "a", "r"];
  const aysLetters = ["a", "y", "s"];

  const earAnimations = useRef(
    earLetters.map(() => new Animated.Value(0))
  ).current;
  const aysAnimations = useRef(
    aysLetters.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Step 0: Circular Reveal Animation (scale up white circle)
    Animated.timing(revealAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      // Step 1: Remove the initial "DD"
      setShowInitialDD(false);
      setShowExpandedD(true);
      // Step 2: Expand spacing between D and D
      Animated.timing(letterSpacingAnim, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false,
      }).start(() => {
        // Step 1: Remove the initial "DD"
        // Step 3: Animate "ear"
        Animated.stagger(
          150,
          earAnimations.map((anim) =>
            Animated.timing(anim, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            })
          )
        ).start(() => {
          // Step 4: Animate "ays"
          Animated.stagger(
            150,
            aysAnimations.map((anim) =>
              Animated.timing(anim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              })
            )
          ).start(() => {
            // Step 5: Move to top
            Animated.timing(textPosition, {
              toValue: -height / 5,
              duration: 1000,
              useNativeDriver: true,
            }).start(() => {
              setShowImage(true);
              setTimeout(() => {
                navigation.navigate("onBoard");
              }, 1500);
            });
          });
        });
      });
    });
  }, []);

  const whiteScale = revealAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={showExpandedD ? "#ffd5ed" : "#b10667"}
          translucent={true}
        />
        {/* Pink background */}
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: "#ffd5ed" }]}
        />
        {/* White circle reveal */}
        <Animated.View
          style={[
            styles.revealCircle,
            {
              transform: [{ scale: whiteScale }],
            },
          ]}
        />
        {/* Animated Text */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              transform: [{ translateY: textPosition }, { scale: textScale }],
            },
          ]}
        >
          {showInitialDD && <Text style={styles.text}>DD</Text>}

          {showExpandedD && (
            <Animated.Text
              style={[
                styles.textNoSpacing,
                { letterSpacing: letterSpacingAnim },
              ]}
            >
              <Text style={styles.text}>
                D
                {earLetters.map((char, i) => (
                  <Animated.Text
                    key={`ear-${i}`}
                    style={[
                      styles.text,
                      {
                        opacity: earAnimations[i],
                        transform: [
                          {
                            translateY: earAnimations[i].interpolate({
                              inputRange: [0, 1],
                              outputRange: [10, 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    {char}
                  </Animated.Text>
                ))}
              </Text>

              <Text style={styles.textNoSpacing}> </Text>

              <Text style={styles.text}>
                D
                {aysLetters.map((char, i) => (
                  <Animated.Text
                    key={`ays-${i}`}
                    style={[
                      styles.text,
                      {
                        opacity: aysAnimations[i],
                        transform: [
                          {
                            translateY: aysAnimations[i].interpolate({
                              inputRange: [0, 1],
                              outputRange: [10, 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    {char}
                  </Animated.Text>
                ))}
              </Text>
            </Animated.Text>
          )}
          {showImage && (
            <Text style={styles.subText}>
              Every day deserves a {"\n"} dear place.
            </Text>
          )}
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffd5ed", // or pink if still in splash phase
    height: height,
    width: width,
  },
  // Circular white reveal from center
  revealCircle: {
    position: "absolute",
    top: height / 2 - 100,
    left: width / 2 - 50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ffe9f6",
  },

  // Text (DD → Dear Days) perfectly centered
  textContainer: {
    position: "absolute",
    top: height / 2 - 90,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#b10667",
    textAlign: "center",
    fontFamily: "Comic Neue",
    letterSpacing: 0,
  },
  textNoSpacing: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#b10667",
    textAlign: "center",
    fontFamily: "Comic Neue",
  },
  subText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#938E8E",
    textAlign: "center",
    fontFamily: "Roboto",
    letterSpacing: 0,
    paddingTop: 24,
  },
});

export default SplashScreen;
