import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

class NotificationHandler {
    _onNotification!: Function;
    _onRegister!: Function;

    onNotification = (notification: any) => {
        if (typeof this._onNotification === 'function') {
            this._onNotification(notification);
        }
        notification?.finish?.(PushNotificationIOS.FetchResult.NoData);
    }

    onRegister = (token: { os: string; token: string; }) => {
        console.log(token)
        if (typeof this._onRegister === 'function') {
            this._onRegister(token);
        }
    }

    onAction = (notification: any) => {
        if (notification.action === 'Yes') {
            PushNotification.invokeApp(notification);
        }
    }

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError = (err: any) => {
        console.log(err);
    }

    attachRegister = (handler: Function) => {
        this._onRegister = handler;
    }

    attachNotification = (handler: Function) => {
        this._onNotification = handler;
    }

    createLocalNotification = (title: string, message: string, id: number): void => {
        PushNotification.localNotification({
            userInfo: { id },
            channelId: "rn-push-notification-channel-id-ding-4-300",
            title,
            message,
            playSound: true,
            soundName: 'default',
            importance: "max",
            priority: "max",
            vibrate: true,
            vibration: 300,
        });
    }

    createScheduledNotification = (title: string, message: string): void => {
        PushNotification.localNotificationSchedule({
            channelId: "rn-push-notification-channel-id-ding-4-300",
            title,
            message,
            playSound: true,
            soundName: 'default',
            date: new Date(Date.now()),
            allowWhileIdle: true,
            importance: 'max',
            priority: 'max',
        });
    }

    removeAllDeliveredNotifications = (): void => {
        if (isIOS) {
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.cancelAllLocalNotifications();
        }
    }

}

export const notificationHandler = new NotificationHandler();

if (!isIOS) {
    PushNotification.createChannel(
        {
            channelId: "rn-push-notification-channel-id-ding-4-300", // (required)
            channelName: `Sound channel`,
            channelDescription: 'A sound channel', // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: 'default',
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
}


PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: notificationHandler.onRegister,

    // (required) Called when a remote or local notification is opened or received
    onNotification: notificationHandler.onNotification,

    // (optional) Called when Action is pressed (Android)
    onAction: notificationHandler.onAction,

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: notificationHandler.onRegistrationError,

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: isIOS,
});
