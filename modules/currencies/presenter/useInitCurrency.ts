import { useEffect } from "react"
import { calculatorModel } from "../../shared/entities/calculator/Calculator";
import { ratesModel } from "../../shared/entities/rates/Rates";
import { getCoinUseCase } from "../useCases/getCoinUseCase";
import { pushNotificationUseCase } from "../../notifications/useCases/pushNotificationsUseCase";
import { firebaseMessaging } from "../../../libraries/notificationService/FirebaseMessaging";
import { notificationHandler } from "../../../libraries/notificationService/NotificationHandler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { notificationsModel } from "../../shared/entities/notifications/Notifications";
import { purchaseModel } from "../../shared/entities/purchase/purchaseModel";

export const useInitCurrency = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        firebaseMessaging.getFCMToken();
        firebaseMessaging.requestUserPermission();
        firebaseMessaging.subscribeToTopic('rateNotification');
        notificationHandler.attachNotification(onReceiveNotification)
        notificationHandler.removeAllDeliveredNotifications();
    }, [])

    useEffect(() => {
        const unsubscribe = firebaseMessaging.subscribeAppWithFCM(pushNotificationUseCase);
        return () => { unsubscribe() };
    }, []);

    const onReceiveNotification = (notification: any) => {
        try {
            const currentNotification = notificationsModel.notificationsList.find(item => item.numberId === notification?.data?.id)
            if (currentNotification) {
                notificationsModel.chosenNotification = currentNotification;
                if (purchaseModel.isFreePeriod || purchaseModel.purchaseHistory?.length) {
                    navigation.navigate('ADD_NOTIFICATIONS')
                }
            };
        } catch (error) {
            console.warn('NotificationService -> onReceiveNotification: ', error);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            ratesModel.firstRate?.id && getCoinUseCase(ratesModel.firstRate?.id)
                .then(coin => {
                    if (coin) {
                        ratesModel.firstRate = coin;
                    }
                })
        }, 120000);
        return () => { interval && clearInterval(interval) };
    }, [])

    useEffect(() => {
        calculatorModel.calculateRate();
    }, [ratesModel.firstRate, ratesModel.secondRate]);

}