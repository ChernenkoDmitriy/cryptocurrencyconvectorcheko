import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getCoinUseCase } from "../../currencies/useCases/getCoinUseCase";
import { notificationsModel } from "../../shared/entities/notifications/Notifications";
import { ICoin } from "../../shared/entities/rates/ICoin";
import { ratesModel } from "../../shared/entities/rates/Rates";
import { useValidation } from "./useValidation";

export const useAddNotification = () => {
    const navigation = useNavigation<any>();
    const { chosenNotification } = notificationsModel;
    const [upNumber, setUpNumber] = useState(chosenNotification?.priceUp || '');
    const [downNumber, setDownNumber] = useState(chosenNotification.priceDown || '');
    const [isEnabled, setIsEnabled] = useState(chosenNotification?.isActive || false);
    const { validateCurrency } = useValidation();

    useEffect(() => {
        getCoinUseCase(notificationsModel.chosenNotification.coin || ratesModel.firstRate.id)
            .then(coin => {
                if (coin) {
                    ratesModel.firstRate = coin;
                    ratesModel.secondRate = { symbol: 'usd' } as ICoin;
                }
            });
    }, [])

    useEffect(() => {
        // validateButtonDisabled(upNumber, downNumber, setIsSaveDisabled)
    }, [upNumber, downNumber]);

    const onChangeUpPrice = (value: string) => {
        const currency = validateCurrency(value);
        if ((currency || !value) && value.length <= 25) {
            setUpNumber(value.replace(/,/g, '.').trim());
        }
    }

    const onChangeDownPrice = (value: string) => {
        const currency = validateCurrency(value);
        if ((currency || !value) && value.length <= 25) {
            setDownNumber(value.replace(/,/g, '.').trim());
        }
    }

    const goToCurrencyList = () => {
        navigation.navigate('CURRENCY_LIST');
    }

    const onSaveNotification = () => {
        saveNotification(upNumber, downNumber, isEnabled)
    }

    const activateNotification = () => {
        setIsEnabled(prev => !prev);
    }

    const saveNotification = (upNumber: string, downNumber: string, isActive: boolean) => {
        const isInclude = notificationsModel.notificationsList.find(notification =>
            notification.id === notificationsModel.chosenNotification.id
        )
        if (isInclude) {
            const notificationsList = notificationsModel.notificationsList.map(notification => (
                notification.id === notificationsModel.chosenNotification.id
                    ? {
                        ...notification,
                        coin: ratesModel.firstRate.id,
                        priceUp: upNumber,
                        priceDown: downNumber,
                        isActive: isActive
                    } : notification
            ))
            notificationsModel.notificationsList = notificationsList;
        } else {
            const notificationsList = [{
                id: notificationsModel.chosenNotification.id,
                coin: ratesModel.firstRate.id,
                priceUp: upNumber,
                priceDown: downNumber,
                isActive: isActive
            }, ...notificationsModel.notificationsList];
            notificationsModel.notificationsList = notificationsList;
        }
        navigation.goBack();
    }

    return { upNumber, downNumber, isEnabled, activateNotification, onChangeUpPrice, onChangeDownPrice, goToCurrencyList, onSaveNotification };
}