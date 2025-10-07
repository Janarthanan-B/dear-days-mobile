import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { Milestone } from "@/data/Milestone";
import { useTheme } from "@/hooks/ThemeContext";
import { pickImage } from "@/utils/ImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, Modal, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
import PrimaryButton from "./common/PrimaryButton";
import PrimaryDateField from "./common/PrimaryDateField";
import PrimaryTextField from "./common/TextField";

interface Props {
  visible: boolean;
  id: string | null;
  onClose: () => void;
}

const MilestoneModel: React.FC<Props> = ({ visible, id = null, onClose }) => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [photo, setPhoto] = useState<string>("");
  const [isAdd, setIsAdd] = useState<boolean>(id == null);
  const [userName, setUserName] = useState("");
  const [partnerName, setPartnerName] = useState("");

  const { themeName } = useTheme();
  const styles = createStyles(themeName);
  const milestoneKeyStore = "@milestones";

  useEffect(() => {
    if (visible) {
      loadData();
    }
  }, [visible]);

  const loadData = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem("@userName");
      const storedPartnerName = await AsyncStorage.getItem("@partnerName");
      if (storedUserName) setUserName(storedUserName);
      if (storedPartnerName) setPartnerName(storedPartnerName);
      const data = await AsyncStorage.getItem(milestoneKeyStore);
      const parsed = data ? JSON.parse(data) : [];
      setMilestones(parsed);

      if (id) {
        const match = parsed.find((m: Milestone) => m.id === id);
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
      let updatedMilestones = [...milestones];

      if (isAdd) {
        const newMileStone: Milestone = {
          id: Date.now().toString().toString(),
          description,
          date,
          photo,
          createdAt: new Date().toISOString(),
        };
        updatedMilestones.push(newMileStone);
      } else {
        updatedMilestones = updatedMilestones.map((m) =>
          m.id === id ? { ...m, description, date, photo } : m
        );
      }

      await AsyncStorage.setItem(
        milestoneKeyStore,
        JSON.stringify(updatedMilestones)
      );
      setMilestones(updatedMilestones);
      resetFields();
      onClose();
    } catch (error) {
      console.log("Error saving Milestone:", error);
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
            {isAdd ? text.Milestone.addMilestone : text.Milestone.editMilestone}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapper}>
              <PrimaryTextField
                placeholder={text.Milestone.description}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <View style={styles.wrapper}>
              <PrimaryDateField
                placeholder={text.Milestone.date}
                value={date}
                onChange={setDate}
              />
            </View>

            {photo ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: photo }} style={styles.previewImg} />
              </View>
            ) : null}
            <View style={styles.wrapper}>
              <PrimaryButton title={text.Moment.addPhotos} onPress={pickData} />
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
                  disabled={description == "" || date == ""}
                />
              </View>
            </View>
            <View style={styles.card}>
              {userName != "" && partnerName != "" && (
                <Text style={styles.title}>
                  {userName} & {partnerName}
                </Text>
              )}
              <Text style={styles.subtitle}>
                have been {description} | {date}
              </Text>
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
      paddingBottom: 16,
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
    wrapper: {
      width: "100%",
      paddingBottom: 16,
    },
    card: {
      backgroundColor: theme.overlay,
      borderRadius: 25,
      paddingVertical: 16,
      paddingHorizontal: 16,
      alignItems: "center",
      marginTop: 30,
      marginHorizontal: 25,
    },
    title: {
      color: theme.backgroundPrimary,
      fontSize: 16,
      fontFamily: "Roboto_500Medium",
      marginBottom: 4,
      textAlign: "center",
    },
    subtitle: {
      color: theme.backgroundPrimary,
      fontSize: 12,
      fontFamily: "Roboto_300Light",
      marginBottom: 6,
      textAlign: "center",
    },
  });
};

export default MilestoneModel;
