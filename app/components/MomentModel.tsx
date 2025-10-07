import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { Moment } from "@/data/Moment";
import { useTheme } from "@/hooks/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native-ui-lib";
import PrimaryButton from "./common/PrimaryButton";
import PrimaryTextField from "./common/TextField";

interface Props {
  visible: boolean;
  id: string | null;
  onClose: () => void;
}

const MomentModal: React.FC<Props> = ({ visible, id = null, onClose }) => {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [photos, setPhotos] = useState<string[]>([]);
  const [isAdd, setIsAdd] = useState<boolean>(true);

  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);
  const momentKeyStore = "@memories";

  useEffect(() => {
    if (visible) {
      loadData();
    }
  }, [visible]);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem(momentKeyStore);
      const parsed = data ? JSON.parse(data) : [];
      setMoments(parsed);

      if (id) {
        const match = parsed.find((m: Moment) => m.id === id);
        if (match) {
          setTitle(match.title);
          setDescription(match.description);
          setDate(match.date);
          setPhotos(match.photos || []);
          setIsAdd(false);
        } else {
          setIsAdd(true);
        }
      } else {
        setIsAdd(true);
        resetFields();
      }
    } catch (error) {
      console.log("Error loading moments:", error);
    }
  };

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().slice(0, 10));
    setPhotos([]);
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        const selected = result.assets.map((a) => a.uri);
        setPhotos((prev) => [...prev, ...selected]);
      }
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };

  const deleteSlide = () => {
    if (moments.length != 1) {
      const updatedMoments = moments.filter((s) => s.id !== id);
      saveMoment(updatedMoments);
    } else {
      Alert.alert("Deletion Denied", "Atleat one memory is needed");
    }
  };

  const handleSave = async () => {
    try {
      let updatedMoments = [...moments];

      if (isAdd) {
        const newMoment: Moment = {
          id: Date.now().toString(),
          title,
          description,
          date,
          photos,
          createdAt: new Date().toISOString(),
        };
        updatedMoments.push(newMoment);
      } else {
        updatedMoments = updatedMoments.map((m) =>
          m.id === id ? { ...m, title, description, date, photos } : m
        );
      }
      saveMoment(updatedMoments);
    } catch (error) {
      console.log("Error saving moment:", error);
    }
  };

  const saveMoment = async (updatedMoments: Moment[]) => {
    await AsyncStorage.setItem(momentKeyStore, JSON.stringify(updatedMoments));
    setMoments(updatedMoments);
    resetFields();
    onClose();
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <View style={styles.titleWrapper}>
            {!isAdd ? <View></View> : <></>}
            <Text style={styles.modalTitle}>
              {isAdd ? text.Moment.addMoment : text.Moment.editMoment}
            </Text>
            {!isAdd ? (
              <TouchableOpacity onPress={deleteSlide}>
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color={theme.primary}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapper}>
              <PrimaryTextField
                placeholder={text.Moment.title}
                value={title}
                onChangeText={setTitle}
              />
            </View>
            <View style={styles.wrapper}>
              <PrimaryTextField
                placeholder={text.Moment.description}
                value={description}
                onChangeText={setDescription}
                multiline={true}
              />
            </View>
            <View style={styles.wrapper}>
              <PrimaryTextField
                placeholder={text.Moment.date}
                value={date}
                onChangeText={setDate}
              />
            </View>
            {photos.length > 0 && (
              <View style={styles.imageContainer}>
                {photos.map((uri, idx) => (
                  <Image key={idx} source={{ uri }} style={styles.previewImg} />
                ))}
              </View>
            )}
            <View style={styles.wrapper}>
              <PrimaryButton
                title={text.Moment.addPhotos}
                onPress={pickImage}
              />
            </View>
            <View style={styles.actionBtn}>
              <View style={{ width: "50%", paddingRight: 5 }}>
                <PrimaryButton
                  title={text.Navigation.cancel}
                  onPress={handleClose}
                  secondary
                />
              </View>
              <View style={{ width: "50%", paddingLeft: 5 }}>
                <PrimaryButton
                  title={text.Navigation.save}
                  onPress={handleSave}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.overlay,
      justifyContent: "center",
      alignItems: "center",
    },
    modalBox: {
      width: "90%",
      height: "80%",
      backgroundColor: theme.backgroundPrimary,
      borderRadius: 20,
      padding: 24,
    },
    titleWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: 24,
      width: "100%",
    },
    modalTitle: {
      fontSize: 20,
      color: theme.primary,
      textAlign: "center",
      fontFamily: "Roboto_500Medium",
    },
    imageContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      alignContent: "center",
      alignSelf: "center",
      width: "100%",
      paddingBottom: 16,
    },
    previewImg: {
      width: 70,
      height: 70,
      borderRadius: 10,
    },
    actionBtn: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    wrapper: {
      width: "100%",
      paddingBottom: 16,
    },
  });
};

export default MomentModal;
