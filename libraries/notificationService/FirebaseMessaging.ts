import messaging from '@react-native-firebase/messaging';
import { IMessaging } from './IMessaging';

export class FirebaseMessaging implements IMessaging {

    subscribeToTopic = async (topic: string) => {
        messaging()
            .subscribeToTopic(topic)
            .then(() => console.log('Subscribed to topic! ', topic))
            .catch((error: any) => console.error('Subscribed to topic error ', error));
    }

    requestUserPermission = async (): Promise<number> => {
        try {
            const result = await messaging().hasPermission();
            return result;
        } catch (error) {
            console.warn('FirebaseMessaging -> requestUserPermission: ', error);
            return 0;
        }
    }

    registerAppWithFCM = async (): Promise<void> => {
        try {
            await this.requestUserPermission();
            const msg = messaging();
            if (!msg.isDeviceRegisteredForRemoteMessages) {
                await msg.registerDeviceForRemoteMessages();
            }
        } catch (error) {
            console.warn('FirebaseMessaging -> registerAppWithFCM: ', error);
        }
    };

    getFCMToken = async (): Promise<string> => {
        try {
            const FCMToken = await messaging().getToken();
            console.log('getFCMToken', FCMToken)
            return FCMToken;
        } catch (error) {
            console.warn('FirebaseMessaging -> getFCMToken: ', error);
            return '';
        }
    }

    onUpdateToken = (callBack: Function): Function => {
        const unsubscribe = messaging().onTokenRefresh(async token => await callBack(token));
        return unsubscribe;
    }

    removeFCMToken = async (): Promise<void> => {
        try {
            await messaging().deleteToken();
        } catch (error) {
            console.warn('FirebaseMessaging -> removeFCMToken: ', error);
        }
    }

    subscribeAppWithFCM = (callBack: Function): Function => {
        const unsubscribeOnOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage) {
                callBack(remoteMessage.notification, 'onNotificationOpenedApp');
            }
        });

        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                callBack(remoteMessage.notification, 'getInitialNotification');
            }
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            if (remoteMessage) {
                callBack(remoteMessage, 'onMessage');
            }
        });

        return () => {
            unsubscribe();
            unsubscribeOnOpenedApp();
        };
    }

}

export const firebaseMessaging = new FirebaseMessaging();
