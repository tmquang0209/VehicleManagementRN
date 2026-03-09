import messaging, { AuthorizationStatus, getToken, onMessage, requestPermission } from '@react-native-firebase/messaging';
import { useCallback, useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { Toast } from 'toastify-react-native';

export const usePushNotifications = () => {
	const [fcmToken, setFcmToken] = useState<string | null>(null);

	const getFcmToken = useCallback(async () => {
		try {
			const token = await getToken(messaging());
			if (token) {
				console.log('FCM Token:', token);
				setFcmToken(token);
			} else {
				console.log('No token received');
			}
		} catch (error) {
			console.log('Error getting token:', error);
		}
	}, []);

	const requestUserPermission = useCallback(async () => {
		if (Platform.OS === 'ios') {
			const authStatus = await requestPermission(messaging());
			const enabled = authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

			if (enabled) {
				console.log('Authorization status:', authStatus);
				getFcmToken();
			}
		} else if (Platform.OS === 'android') {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				getFcmToken();
			}
		}
	}, [getFcmToken]);

	useEffect(() => {
		requestUserPermission();

		// Listen to foreground messages
		const unsubscribe = onMessage(messaging(), async (remoteMessage) => {
			console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

			// Show in-app notification
			if (remoteMessage.notification) {
				Toast.success(remoteMessage.notification.title || 'New Notification');
			}
		});

		return unsubscribe;
	}, [requestUserPermission]);

	return { fcmToken };
};
