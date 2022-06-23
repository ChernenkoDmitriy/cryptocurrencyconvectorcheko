import { useEffect } from "react"
import { calculatorModel } from "../../shared/entities/calculator/Calculator";
import { ratesModel } from "../../shared/entities/rates/Rates";
import { getCoinUseCase } from "../useCases/getCoinUseCase";
import messaging from '@react-native-firebase/messaging';
import { getToken, requestUserPermission, subscribeToTopic } from "../../../libraries/notificationService/NotificationHelper";
import { pushNotificatonUseCase } from "../../notifications/useCases/pushNotificationsUseCase";

export const useInitCurrency = () => {
    useEffect(() => {
        getToken();
        subscribeToTopic();
        requestUserPermission();
    }, [])

    useEffect(() => {
        console.log('foregroundMassaging')
        const unsubscribe = messaging().onMessage(pushNotificatonUseCase);
        return unsubscribe
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            ratesModel.firstRate?.id && getCoinUseCase(ratesModel.firstRate?.id)
                .then(coin => {
                    if (coin) {
                        ratesModel.firstRate = coin;
                    }
                })
        }, 6000);
        return () => { interval && clearInterval(interval) };
    }, [])

    useEffect(() => {
        calculatorModel.calculateRate();
    }, [ratesModel.firstRate, ratesModel.secondRate]);

}