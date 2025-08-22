
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';

import { saveFirebaseToken } from '../redux/slices/NotificationSlice'; 
export const setupPushNotifications = async (dispatch) => {
const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    
      await getFcmToken(dispatch);
    }
  };
  const getFcmToken = async (dispatch) => {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:99999999:', token);
        await AsyncStorage.setItem('fcmToken', token); 
      dispatch(saveFirebaseToken(token));

      }
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  };
  const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    Alert.alert(
      remoteMessage.notification?.title || 'New Notification',
      remoteMessage.notification?.body || ''
    );
  });
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  if (Platform.OS === 'ios') {
    await messaging().registerDeviceForRemoteMessages();
  }
  await requestUserPermission();
  return unsubscribeOnMessage;
};