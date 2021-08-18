import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';


class LocalNotificationService {
	configure = onOpenNotification => {
		PushNotification.configure({
			onRegister: function(token) {
				console.log('TOKEN:', token);
			},

			onNotification: function(notification) {
				console.log('NOTIFICATION:', notification);

				if (!notification?.data) {
					return;
				}
				notification.userInteraction(true);
				onOpenNotification(
					Platform.OS === 'ios' ? notification.data.item : notification.data,
				);

				if (Platform.OS === 'ios') {
					notification.finish(PushNotificationIOS.FetchResult.NoData);
				}
			},

			// IOS ONLY (optional): default: all - Permissions to register.
			permissions: {
				alert: true,
				badge: true,
				sound: true,
			},

			popInitialNotification: true,

			requestPermissions: true,
		});
	};

	unRegister = () => {
		PushNotification.unregister();
    };
    

	showNotification = (id, title, message, data = {}, options = {}) => {
		PushNotification.localNotification({
			// android only properties
			...this.buildAndroidNotifications(
				id,
				title,
				message,
				(data = {}),
				(options = {}),
			),
			//   IOS only properties
			...this.buildIOSNotifications(
				id,
				title,
				message,
				(data = {}),
				(options = {}),
			),
			title: title || '',
			message: message || '',
			playSound: options.playSound || false,
			soundName: options.soundName || 'default',
			userInteraction: false,
		});
	};

	buildAndroidNotifications = (id, title, message, data = {}, options = {}) => {
		return {
			id: id,
			autoCancel: true,
			largeIcon: options.largeIcon || 'ic_launcher',
			smallIcon: options.smallIcon || 'ic_notification',
			bigText: message || '',
			subtext: title || '',
			vibrate: options.vibrate || true,
			vibration: options.vibration || 300,
			priority: options.priority || 'high',
			importance: options.importance || 'high',
			data: data,
		};
	};

	buildIOSNotifications = (id, title, message, data = {}, options = {}) => {
		return {
			alertAction: options.alertAction || 'view',
			category: options.category || '',
			userInfo: {
				id: id,
				item: data,
			},
		};
    };
    

    cancelAllLocalNotications = ()=>{
        if(Platform.OS === 'ios'){
            PushNotificationIOS.removeAllDeliveredNotifications()
        }else{
            PushNotification.cancellAllLocalNotifications()
        }
    }

    removeDeliveredNotificationByID = (notificationId) =>{
        console.log("[LocalNotificationService] removeDeliveredNotifictionByID:", notificationId)

        PushNotification.cancelLocalNotifications({id:`{notificationId}`})
    }
}

export const localNotificationService = new LocalNotificationService()