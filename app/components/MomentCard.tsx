import { Colors, ThemeName } from "@/constants/theme";
import { Moment } from "@/data/Moment";
import { useTheme } from "@/hooks/ThemeContext";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Carousel } from "react-native-ui-lib";

interface Props {
  onSelect: (id: string) => void;
  item: Moment;
}
const MomentCard: React.FC<Props> = ({ item, onSelect }) => {
  const { themeName } = useTheme();
  const styles = createStyles(themeName);
  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Carousel
          containerStyle={{
            height: "100%",
            width: "100%",
          }}
          pageControlProps={{
            size: 10,
            containerStyle: styles.loopCarousel,
          }}
          //pageControlPosition={Carousel.pageControlPositions.OVER}
          showCounter
        >
          {item.photos?.map((uri, i) => {
            return (
              <ImageBackground
                source={{ uri }}
                resizeMode="cover"
                key={i}
                style={styles.previewImg}
              />
            );
          })}
        </Carousel>
      </View>
      <TouchableOpacity
        style={styles.contentSection}
        onPress={() => onSelect(item.id)}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
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
    imagePlaceholder: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      width: "60%",
    },
    iconTriangle: {
      width: 0,
      height: 0,
      borderLeftWidth: 15,
      borderRightWidth: 15,
      borderBottomWidth: 25,
      borderStyle: "solid",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "#9E9E9E",
    },
    iconStar: {
      width: 30,
      height: 30,
      backgroundColor: "#9E9E9E",
      transform: [{ rotate: "45deg" }],
      position: "relative",
    },
    iconSquare: {
      width: 25,
      height: 25,
      backgroundColor: "#9E9E9E",
      borderRadius: 4,
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
      paddingBottom: 8,
      textAlign: "center",
    },
    description: {
      width: "100%",
      textTransform: "capitalize",
      fontFamily: "Roboto_300Light",
      fontSize: 16,
      color: theme.textPrimary,
    },
    loopCarousel: {
      position: "absolute",
    },
    previewImg: {
      flex: 1,
    },
  });
};

export default MomentCard;
