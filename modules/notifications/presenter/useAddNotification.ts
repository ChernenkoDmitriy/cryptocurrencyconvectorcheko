import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { getCoinUseCase } from "../../currencies/useCases/getCoinUseCase";
import { notificationsModel } from "../../shared/entities/notifications/Notifications";
import { ICoin } from "../../shared/entities/rates/ICoin";
import { ratesModel } from "../../shared/entities/rates/Rates";
import { useSafeState } from "../../shared/hooks/useSafeState";
import { useValidation } from "./useValidation";

export const useAddNotification = () => {
    const navigation = useNavigation<any>();
    const { chosenNotification } = notificationsModel;
    const [comment, setComment] = useSafeState(chosenNotification?.comment || '');
    const [upNumber, setUpNumber] = useSafeState(chosenNotification?.priceUp || '');
    const [downNumber, setDownNumber] = useSafeState(chosenNotification.priceDown || '');
    const [isEnabled, setIsEnabled] = useSafeState(chosenNotification?.isActive || false);
    const { validateCurrency, validateNumbers } = useValidation();

    useEffect(() => {
        getCoinUseCase(notificationsModel.chosenNotification.coin || ratesModel.firstRate.id)
            .then(coin => {
                if (coin) {
                    ratesModel.firstRate = coin;
                    ratesModel.secondRate = { symbol: 'usd' } as ICoin;
                }
            });
    }, [])

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
        saveNotification(upNumber, downNumber, isEnabled, comment)
    }

    const activateNotification = () => {
        setIsEnabled(prev => !prev);
    }

    const saveNotification = (upNumber: string, downNumber: string, isActive: boolean, comment: string) => {
        const isInclude = notificationsModel.notificationsList.find(notification =>
            notification.id === notificationsModel.chosenNotification.id
        )
        if (isInclude) {
            const notificationsList = notificationsModel.notificationsList.map(notification => (
                notification.id === notificationsModel.chosenNotification.id
                    ? {
                        ...notification,
                        coin: ratesModel.firstRate.id,
                        priceUp: upNumber ? validateNumbers(upNumber) : '',
                        priceDown: downNumber ? validateNumbers(downNumber) : '',
                        isActive: isActive,
                        symbol: ratesModel.firstRate.symbol,
                        comment,
                    } : notification
            ))
            notificationsModel.notificationsList = notificationsList;
        } else {
            const notificationsList = [{
                numberId: Date.now(),
                id: notificationsModel.chosenNotification.id,
                coin: ratesModel.firstRate.id,
                priceUp: upNumber ? validateNumbers(upNumber) : '',
                priceDown: downNumber ? validateNumbers(downNumber) : '',
                isActive: isActive,
                symbol: ratesModel.firstRate.symbol,
                comment
            }, ...notificationsModel.notificationsList];
            notificationsModel.notificationsList = notificationsList;
        }
        navigation.goBack();
    }

    return {
        upNumber, downNumber, isEnabled, comment, setComment,
        activateNotification, onChangeUpPrice, onChangeDownPrice, goToCurrencyList, onSaveNotification
    };
}