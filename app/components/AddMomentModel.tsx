import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { Moment } from "@/data/Moment";
import { useTheme } from "@/hooks/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Modal, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
import PrimaryButton from "./common/PrimaryButton";
import PrimaryTextField from "./common/TextField";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (value: Moment) => void;
}

const AddMomentModal: React.FC<Props> = ({ visible, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [photos, setPhotos] = useState<string[]>([]);
  const { themeName } = useTheme();
  const styles = createStyles(themeName);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      const temPhotos = photos;
      result.assets.forEach((asset, index) => temPhotos.push(asset.uri));
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const handleSave = () => {
    if (!title) return;
    onSave({ title, description, date, photos });
    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().slice(0, 10));
    setPhotos([]);
    onClose();
  };
  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().slice(0, 10));
    setPhotos([]);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>{text.Moment.addNew}</Text>
          <PrimaryTextField
            placeholder={text.Moment.title}
            value={title}
            onChangeText={setTitle}
          />
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

          <View style={styles.imageConatiner}>
            {photos.map((uri, idx) => (
              <Image key={idx} source={{ uri }} style={styles.previewImg} />
            ))}
          </View>
          <PrimaryButton title={text.Moment.addPhotos} onPress={pickImage} />
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
      gap: 16,
    },
    modalTitle: {
      fontSize: 20,
      color: theme.primary,
      textAlign: "center",
      fontFamily: "Roboto_500Medium",
      letterSpacing: 0,
    },
    imageConatiner: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      alignContent: "center",
      alignSelf: "center",
      width: "100%",
      gap: 5,
    },
    previewImg: {
      width: 60,
      height: 60,
      borderRadius: 8,
    },
    actionBtn: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    btnLabel: {
      color: "#fff",
    },
  });
};

export default AddMomentModal;
