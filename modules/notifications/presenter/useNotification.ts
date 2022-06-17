import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { getCoinUseCase } from "../../currencies/useCases/getCoinUseCase"
import { INotificationsListItem } from "../../shared/entities/notifications/INotificationsListItem"
import { notificationsModel } from "../../shared/entities/notifications/Notifications"
import { ICoin } from "../../shared/entities/rates/ICoin"
import { ratesModel } from "../../shared/entities/rates/Rates"
import { fetchNotificationsCoins } from "../useCases/getCoinsUseCase"

export const useNotification = () => {
    const navigation = useNavigation<any>();
    const [coinsList, setCoinsList] = useState([])

    useEffect(() => {
        fetchNotificationsCoins()
            .then(list => {
                setCoinsList(list)
            })
    }, [notificationsModel.notificationsList])

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
                        priceUp: upNumber || null,
                        priceDown: downNumber || null,
                        isActive: isActive
                    } : notification
            ))
            notificationsModel.notificationsList = notificationsList;
        } else {
            const notificationsList = [{
                id: notificationsModel.chosenNotification.id,
                coin: ratesModel.firstRate.id,
                priceUp: upNumber || null,
                priceDown: downNumber || null,
                isActive: isActive
            }, ...notificationsModel.notificationsList];
            notificationsModel.notificationsList = notificationsList;
        }
        navigation.goBack();
    }

    const deleteNotification = (id: string) => {
        const notificationsList = notificationsModel.notificationsList.filter(notification => notification.id !== id)
        notificationsModel.notificationsList = notificationsList;
    }

    const changeNotificationCurrency = (value: INotificationsListItem) => {
        getCoinUseCase(value.coin)
            .then(coin => {
                if (coin) {
                    ratesModel.firstRate = coin;
                    ratesModel.secondRate = { symbol: 'usd' } as ICoin;
                }
            });
    }

    return { saveNotification, coinsList, deleteNotification, changeNotificationCurrency };
}