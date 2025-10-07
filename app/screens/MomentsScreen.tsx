import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { Moment } from "@/data/Moment";
import { useTheme } from "@/hooks/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CouplePhotoBooth from "../../assets/images/couple-in-photo-booth.svg";
import MomentCard from "../components/MomentCard";
import MomentModal from "../components/MomentModel";
import ScreenTemplate from "../components/templates/ScreenTemplate";

const MomentsScreen = () => {
  const { themeName } = useTheme();
  const styles = createStyles(themeName);
  const momentKeyStore = "@memories";

  const [moments, setMoments] = useState<Moment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    loadMoments();
  }, []);

  const loadMoments = async () => {
    try {
      const stored = await AsyncStorage.getItem(momentKeyStore);
      if (stored) {
        setMoments(JSON.parse(stored));
      }
    } catch (err) {
      console.log("Error loading moments", err);
    }
  };

  const onClose = async () => {
    setActiveId(null);
    setModalVisible(false);
    loadMoments();
  };

  return (
    <ScreenTemplate
      title={text.Moment.title}
      addButton
      onAddClick={() => setModalVisible(true)}
    >
      {moments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <CouplePhotoBooth />
          <Text style={styles.emptyText}>{text.Moment.noMoment}</Text>
        </View>
      ) : (
        <FlatList
          data={moments}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <MomentCard
              item={item}
              onSelect={(id) => {
                setActiveId(id);
                setModalVisible(true);
              }}
            />
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      <MomentModal id={activeId} visible={modalVisible} onClose={onClose} />
    </ScreenTemplate>
  );
};

const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyImage: {
      width: 220,
      height: 220,
      marginBottom: 15,
    },
    emptyText: {
      fontSize: 16,
      color: theme.textInfo,
      textAlign: "center",
      fontFamily: "Roboto_300Light",
      letterSpacing: 0,
      paddingTop: 24,
    },
  });
};

export default MomentsScreen;
