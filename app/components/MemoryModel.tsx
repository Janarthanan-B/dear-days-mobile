import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { Memory } from "@/data/Memory";
import { useTheme } from "@/hooks/ThemeContext";
import { pickImage } from "@/utils/ImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, Modal, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
import PrimaryButton from "./common/PrimaryButton";
import PrimaryTextField from "./common/TextField";

interface Props {
  visible: boolean;
  id: string | null;
  onClose: () => void;
}

const MemoryModel: React.FC<Props> = ({ visible, id = null, onClose }) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [photo, setPhoto] = useState<string>("");
  const [isAdd, setIsAdd] = useState<boolean>(true);

  const { themeName } = useTheme();
  const styles = createStyles(themeName);
  const memoryKeyStore = "@memories";

  useEffect(() => {
    if (visible) {
      loadData();
    }
  }, [visible]);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem(memoryKeyStore);
      const parsed = data ? JSON.parse(data) : [];
      setMemories(parsed);

      if (id) {
        const match = parsed.find((m: Memory) => m.id === id);
        if (match) {
          setDescription(match.description);
          setDate(match.date);
          setPhoto(match.photo);
          setIsAdd(false);
        }
      }
    } catch (error) {
      console.log("Error loading data:", error);
    }
  };

  const resetFields = () => {
    setDescription("");
    setDate(new Date().toISOString().slice(0, 10));
    setPhoto("");
  };

  const pickData = async () => {
    const image = await pickImage();
    if (image) setPhoto(image);
  };

  const handleSave = async () => {
    try {
      let updatedMemories = [...memories];

      if (isAdd) {
        const newMemory: Memory = {
          id: Date.now().toString().toString(),
          description,
          date,
          photo,
          createdAt: new Date().toISOString(),
        };
        updatedMemories.push(newMemory);
      } else {
        updatedMemories = updatedMemories.map((m) =>
          m.id === id ? { ...m, description, date, photo } : m
        );
      }

      await AsyncStorage.setItem(
        memoryKeyStore,
        JSON.stringify(updatedMemories)
      );
      setMemories(updatedMemories);
      resetFields();
      onClose();
    } catch (error) {
      console.log("Error saving memory:", error);
    }
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>
            {isAdd ? text.Moment.addNew : text.Moment.editMemory}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <PrimaryTextField
              placeholder={text.Moment.description}
              value={description}
              onChangeText={setDescription}
              multiline={true}
            />
            <PrimaryTextField
              placeholder={text.Moment.date}
              value={date}
              onChangeText={setDate}
            />

            {photo ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: photo }} style={styles.previewImg} />
              </View>
            ) : null}

            <PrimaryButton title={text.Moment.addPhotos} onPress={pickData} />

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
      height: "70%",
      backgroundColor: theme.backgroundPrimary,
      borderRadius: 20,
      padding: 24,
      gap: 16,
    },
    modalTitle: {
      fontSize: 20,
      color: theme.primary,
      textAlign: "center",
      fontFamily: "Roboto_500Medium",
      paddingBottom: 24,
    },
    imageContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    previewImg: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginVertical: 10,
    },
    actionBtn: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

export default MemoryModel;
