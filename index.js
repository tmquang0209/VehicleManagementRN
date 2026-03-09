import messaging, { setBackgroundMessageHandler } from '@react-native-firebase/messaging';

// Register background handler early to fix "ReactNativeFirebaseMessagingHeadlessTask" warning on iOS
setBackgroundMessageHandler(messaging(), async (remoteMessage) => {
	console.log('Message handled in the background!', remoteMessage);
});

// eslint-disable-next-line import/first
import 'expo-router/entry';
