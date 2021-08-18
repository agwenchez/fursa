import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

class FCMService {
	register = (onRegister, onNotification, onOpenNotification) => {
		this.checkPermission(onRegister);
		this.createNotificationListeners(
			onRegister,
			onNotification,
			onOpenNotification,
		);
    };
    
	registerAppwithFCM = async () => {
		if (Platform.OS === 'ios') {
			await messaging().registerDeviceForRemoteMessages();
			await messaging().setAutoInitEnabled(true);
		}
	};

	checkPermission = onRegister => {
		messaging()
			.hasPermission()
			.then(enabled => {
				if (enabled) {
					this.getToken(onRegister);
				} else {
					this.requestPermissin(onRegister);
				}
			})
			.catch(error => console.log('[FCMService] Permission rejected', error));
	};

	getToken = onRegister => {
		messaging()
			.getToken()
			.then(fcmToken => {
				if (fcmToken) {
					onRegister(fcmToken);
				} else {
					console.log('[FCMService] User does not have a fcmToken');
				}
			})
			.catch(error => console.log('[FCMService] getToken rejected', error));
	};

	requestPermissin = onRegister => {
		messaging()
			.requestPermissin()
			.then(() => {
				this.getToken(onRegister);
			})
			.catch(error => console.log('[FCMService] Permission rejected', error));
	};

	deleteToken = () => {
		console.log('[FCMService] deleteToken');
		messaging()
			.deleteToken()
			.catch(error => console.log('[FCMService] Delete token', error));
	};

	createNotificationListeners = (
		onRegister,
		onNotification,
		onOpenNotification,
	) => {
		// when application is runnning at in the background
		messaging().onNotificationOpenedApp(remoteMessage => {
			console.log(
				'[FCMService] onNotificationOpenedApp Notification caused app to open',
				remoteMessage,
			);
			if (remoteMessage) {
				const notification = remoteMessage.notification;
				onOpenNotification(notification);
			}
		});

		// when app opened in a quiet state
		messaging()
			.getInitialNotification()
			.then(remoteMessage => {
				console.log(
					'[FCMService] getInitialNotification Notification caused app to open',
					remoteMessage,
				);
				if (remoteMessage) {
					const notification = remoteMessage.notification;
					onOpenNotification(notification);
				}
			});

		// foreground state messages
		this.messageListener = messaging().onMessage(async remoteMessage => {
			console.log('[FCMService] A new fcm message arrived!', remoteMessage);

			if (remoteMessage) {
				let notification = null;
				if (Platform.OS == 'ios') {
					notification = remoteMessage.data.notification;
				} else {
					notification = remoteMessage.notification;
				}

				onNotification(notification);
			}
		});

		// when we have a new token
		messaging().onTokenRefresh(fcmToken => {
			console.log('[FCMService] New fcmToken refresh!', fcmToken);
			onRegister(fcmToken);
		});
	};

	unRegister = () => {
		this.messageListener();
	};
}

export const fcmService = new FCMService();
