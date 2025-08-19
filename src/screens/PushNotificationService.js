// // PushNotificationService.js
// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert, Platform } from 'react-native';
// export const setupPushNotifications = async () => {
//   // Request permission
//   const requestUserPermission = async () => {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//       await getFcmToken();
//     }
//   };
//   // Get FCM token
//  const getFcmToken = async () => {
//   try {
//     const token = await messaging().getToken();
//     if (token) {
//       console.log('FCM Token:-=-===============================----------------------------==============', token);
//       await AsyncStorage.setItem('fcmToken', token); // store locally
//     }
//   } catch (error) {
//     console.log('Error getting FCM token:', error);
//   }
// };
//   // Listen for foreground messages
//   const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
//     Alert.alert(
//       remoteMessage.notification?.title || 'New Notification',
//       remoteMessage.notification?.body || ''
//     );
//   });
//   // Set background message handler
//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//   });
//   // iOS: optionally request notification permission explicitly
//   if (Platform.OS === 'ios') {
//     await messaging().registerDeviceForRemoteMessages();
//   }
//   await requestUserPermission();
//   return unsubscribeOnMessage;
// };
// PushNotificationService.js
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';

import { saveFirebaseToken } from '../redux/slices/Notificationslice'; // Import the thunk

// The main function now accepts 'dispatch'
export const setupPushNotifications = async (dispatch) => {
  // Request permission
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      // Pass the dispatch function to getFcmToken
      await getFcmToken(dispatch);
    }
  };

  // Get FCM token
  // This function now accepts 'dispatch'
  const getFcmToken = async (dispatch) => {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:99999999:', token);
        await AsyncStorage.setItem('fcmToken', token); // store locally

        // Dispatch the saveFirebaseToken thunk
      dispatch(saveFirebaseToken(token));

      }
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  };

  // Listen for foreground messages
  const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    Alert.alert(
      remoteMessage.notification?.title || 'New Notification',
      remoteMessage.notification?.body || ''
    );
  });

  // Set background message handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // iOS: optionally request notification permission explicitly
  if (Platform.OS === 'ios') {
    await messaging().registerDeviceForRemoteMessages();
  }

  await requestUserPermission();
  return unsubscribeOnMessage;
};