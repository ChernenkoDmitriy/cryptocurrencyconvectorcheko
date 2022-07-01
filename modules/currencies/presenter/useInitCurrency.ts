import { useEffect } from "react"
import { calculatorModel } from "../../shared/entities/calculator/Calculator";
import { ratesModel } from "../../shared/entities/rates/Rates";
import { getCoinUseCase } from "../useCases/getCoinUseCase";
import { pushNotificationUseCase } from "../../notifications/useCases/pushNotificationsUseCase";
import { firebaseMessaging } from "../../../libraries/notificationService/FirebaseMessaging";
import { notificationHandler } from "../../../libraries/notificationService/NotificationHandler";

export const useInitCurrency = () => {
    useEffect(() => {
        firebaseMessaging.getFCMToken();
        firebaseMessaging.requestUserPermission();
        firebaseMessaging.subscribeToTopic('rateNotification');
        notificationHandler.removeAllDeliveredNotifications();
    }, [])

    useEffect(() => {
        const unsubscribe = firebaseMessaging.subscribeAppWithFCM(pushNotificationUseCase);
        return () => { unsubscribe() };
    }, []);

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