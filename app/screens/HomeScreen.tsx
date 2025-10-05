import { Colors, ThemeName } from "@/constants/theme";
import { Memory } from "@/data/Memory";
import { useTheme } from "@/hooks/ThemeContext";
import { DATE_FORMATS, formatDate } from "@/utils/DateUtils";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDrawerProgress } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import MemoryModel from "../components/MemoryModel";
import MemoryOptions, { MemoryOptionType } from "../components/MemoryOptions";

const { height, width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();

  const [memories, setMemories] = useState<Memory[]>([]);
  const [userName, setUserName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [dateFormatIndex, setDateFormatIndex] = useState(0);
  const [model, setModel] = useState(false);
  const { themeName } = useTheme();
  const styles = createStyles(themeName);
  const memoryKeyStore = "@memories";
  const [activeId, setActiveId] = useState<string | null>(null);
  const progress = useDrawerProgress();

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, 10]);
    const scale = interpolate(progress.value, [0, 1], [1, 0.95]);
    return {
      transform: [{ translateX }, { scale }],
      borderRadius: interpolate(progress.value, [0, 1], [0, 20]),
    };
  });
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem("@userName");
      const storedPartnerName = await AsyncStorage.getItem("@partnerName");
      const data = await AsyncStorage.getItem(memoryKeyStore);
      if (storedUserName) setUserName(storedUserName);
      if (storedPartnerName) setPartnerName(storedPartnerName);
      const parsed = data ? JSON.parse(data) : [];
      setMemories(parsed);
    } catch (error) {
      console.log("Error loading data:", error);
    }
  };

  const memoryOption = (option: MemoryOptionType, id: string) => {
    switch (option) {
      case "add":
        setActiveId(null);
        setModel(true);
        break;
      case "edit":
        setActiveId(id);
        setModel(true);
        break;
      case "delete":
        deleteSlide(id);
        break;
    }
  };

  const saveMemories = async (newMemories: Memory[]) => {
    setMemories(newMemories);
    await AsyncStorage.setItem(memoryKeyStore, JSON.stringify(newMemories));
  };

  const deleteSlide = (id: string) => {
    if (memories.length != 1) {
      const updated = memories.filter((s) => s.id !== id);
      saveMemories(updated);
    }
    Alert.alert("Deletion Denied", "Atleat one memory is needed");
  };

  const toggleDateFormat = () => {
    setDateFormatIndex((prev) => (prev + 1) % DATE_FORMATS.length);
  };

  const renderItem = ({ item, drag }: RenderItemParams<Memory>) => {
    return (
      <TouchableOpacity
        style={{ height, width }}
        onLongPress={drag}
        activeOpacity={1}
      >
        <ImageBackground
          source={
            item.photo && item.photo != ""
              ? { uri: item.photo }
              : require("../../assets/images/default_memory.png")
          }
          style={styles.background}
          blurRadius={1.2}
        >
          {/* Menu Icon */}
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Ionicons name="menu" size={26} color="#fff" />
          </TouchableOpacity>

          {/* Main Card */}
          <View style={styles.card}>
            <Text style={styles.subtitle}>
              {userName} & {partnerName} {item.date}
            </Text>
            <Text style={styles.subtitle}>got married on {item.date}</Text>

            {/* Date Section */}
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={toggleDateFormat}
            >
              <Text style={styles.dateText}>
                {formatDate(item.date, dateFormatIndex)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Delete Button */}
          <MemoryOptions onSelect={(type) => memoryOption(type, item.id)} />
          <MemoryModel
            visible={model}
            id={activeId}
            onClose={() => {
              setModel(false);
              loadData();
            }}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {memories.length > 0 ? (
          <DraggableFlatList
            data={memories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onDragEnd={({ data }) => saveMemories(data)}
            pagingEnabled
            snapToInterval={height}
            decelerationRate="fast"
          />
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No slides yet. Add one!</Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.backgroundSecoundary },
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      resizeMode: "cover",
      height: height,
      width: width,
    },
    menuIcon: {
      position: "absolute",
      top: 50,
      left: 25,
      borderRadius: 10,
      padding: 6,
    },
    card: {
      backgroundColor: theme.overlay,
      borderRadius: 25,
      paddingVertical: 30,
      paddingHorizontal: 40,
      alignItems: "center",
    },
    title: {
      color: "#fff",
      fontSize: 26,
      fontWeight: "600",
      marginBottom: 6,
      textAlign: "center",
    },
    subtitle: {
      color: "#ddd",
      fontSize: 14,
      marginBottom: 18,
      textAlign: "center",
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    dateText: {
      color: "#fff",
      fontSize: 18,
      marginVertical: 2,
    },
    separator: {
      color: "#aaa",
      fontSize: 16,
      marginHorizontal: 6,
    },
    deleteButton: {
      position: "absolute",
      top: 50,
      right: 25,
      backgroundColor: "rgba(0,0,0,0.4)",
      padding: 6,
      borderRadius: 10,
    },
    addButton: {
      position: "absolute",
      bottom: 40,
      right: 20,
      backgroundColor: "#333",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 30,
    },
    addText: { color: "#fff", fontSize: 16 },
    empty: { flex: 1, justifyContent: "center", alignItems: "center" },
    emptyText: { color: "#888", fontSize: 18 },
  });
};
