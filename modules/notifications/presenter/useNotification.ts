import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { getCoinUseCase } from "../../currencies/useCases/getCoinUseCase"
import { INotificationsListItem } from "../../shared/entities/notifications/INotificationsListItem"
import { notificationsModel } from "../../shared/entities/notifications/Notifications"
import { ICoin } from "../../shared/entities/rates/ICoin"
import { ratesModel } from "../../shared/entities/rates/Rates"
import { fetchNotificationsCoins } from "../useCases/getCoinsUseCase"

export const useNotification = () => {
    const [coinsList, setCoinsList] = useState([]);

    useEffect(() => {
        fetchNotificationsCoins()
            .then(list => {
                setCoinsList(list)
            })
    }, [notificationsModel.notificationsList]);

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

    const validateButtonDisabled = (upNumber: string, downNumber: string, setDisabled: Dispatch<SetStateAction<boolean>>) => {
        if (upNumber === '' && downNumber === '') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    return { coinsList, deleteNotification, changeNotificationCurrency, validateButtonDisabled };
}