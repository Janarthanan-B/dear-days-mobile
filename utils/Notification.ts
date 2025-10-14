import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { getDaysTogether } from "./DateUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: false,
    shouldShowList: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default Channel",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
      enableVibrate: true,
      enableLights: true,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FFE9F6",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  await AsyncStorage.setItem(
    "@notificationsEnabled",
    JSON.stringify(finalStatus === "granted")
  );

  return finalStatus === "granted";
}

export async function scheduleDailyNotification(
  hour: number,
  minute: number,
  description: string,
  date: string
) {
  const dateFormat = getDaysTogether(date);

  // Optional: cancel old notifications
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `You ${description} - ${dateFormat}`,
      body: "Keep going strong 💖",
      sound: "default",
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: {
      hour,
      minute,
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
    },
  });
}
