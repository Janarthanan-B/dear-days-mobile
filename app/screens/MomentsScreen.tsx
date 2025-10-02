import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { Moment } from "@/data/Moment";
import { useTheme } from "@/hooks/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CouplePhotoBooth from "../../assets/images/couple-in-photo-booth.svg";
import AddMomentModal from "../components/AddMomentModel";
import MomentCard from "../components/MomentCard";
import ScreenTemplate from "../components/templates/ScreenTemplate";

const MomentsScreen = () => {
  const { themeName } = useTheme();
  const styles = createStyles(themeName);

  const [moments, setMoments] = useState<Moment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadMoments();
  }, []);

  const loadMoments = async () => {
    try {
      const stored = await AsyncStorage.getItem("moments");
      if (stored) {
        setMoments(JSON.parse(stored));
      }
    } catch (err) {
      console.log("Error loading moments", err);
    }
  };

  const saveMoment = async (moment: Moment) => {
    try {
      const updated = [...moments, moment];
      setMoments(updated);
      await AsyncStorage.setItem("moments", JSON.stringify(updated));
    } catch (err) {
      console.log("Error saving moment", err);
    }
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MomentCard
              title={item.title}
              description={item.description}
              date={item.date}
              photos={item.photos}
            />
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      <AddMomentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={saveMoment}
      />
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
