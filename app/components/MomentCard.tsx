import { Colors, ThemeName } from "@/constants/theme";
import { Moment } from "@/data/Moment";
import { useTheme } from "@/hooks/ThemeContext";
import React from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

interface Props {
  onSelect: (id: string) => void;
  item: Moment;
}

const { width } = Dimensions.get("window");

const MomentCard: React.FC<Props> = ({ item, onSelect }) => {
  const { themeName } = useTheme();
  const styles = createStyles(themeName);

  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        <Text style={styles.dateText}>{item.date}</Text>

        {/* Native horizontal image slider */}
        <FlatList
          data={item.photos || []}
          keyExtractor={(uri, index) => `${uri}-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: uri }) => (
            <ImageBackground
              source={{ uri }}
              resizeMode="cover"
              style={[styles.previewImg, { width }]}
            />
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.contentSection}
        onPress={() => onSelect(item.id)}
      >
        <Text style={styles.title}>{item.title}</Text>
        {item.description !== "" && (
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    container: {
      marginBottom: 20,
      borderRadius: 12,
      backgroundColor: theme.backgroundPrimary,
      shadowColor: theme.overlay,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: "hidden",
    },
    imageSection: {
      width: "100%",
      height: 160,
      backgroundColor: "#E0E0E0",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    dateText: {
      position: "absolute",
      top: 10,
      left: 10,
      textTransform: "capitalize",
      fontFamily: "Roboto_500Medium",
      fontSize: 13,
      color: theme.backgroundPrimary,
      zIndex: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
      padding: 4,
      borderRadius: 12,
    },
    previewImg: {
      height: 160,
    },
    contentSection: {
      padding: 15,
      backgroundColor: theme.backgroundSecoundary,
    },
    title: {
      textTransform: "capitalize",
      fontFamily: "Roboto_500Medium",
      fontSize: 16,
      color: theme.primary,
      textAlign: "center",
    },
    description: {
      width: "100%",
      textTransform: "capitalize",
      fontFamily: "Roboto_300Light",
      fontSize: 16,
      color: theme.textPrimary,
      paddingTop: 8,
    },
  });
};

export default MomentCard;
