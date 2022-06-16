import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { notificationsModel } from "../../shared/entities/notifications/Notifications"
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
        const notificationsList = [{
            coin: ratesModel.firstRate.id,
            priceUp: upNumber || null,
            priceDown: downNumber || null,
            isActive: isActive
        }, ...notificationsModel.notificationsList];
        notificationsModel.notificationsList = notificationsList;
        navigation.goBack();
    }

    const deleteNotification = (index: number) => {
        const notificationsList = [...notificationsModel.notificationsList];
        notificationsList.splice(index, 1);
        notificationsModel.notificationsList = notificationsList;
    }

    const editNotification = () => {

    }

    return { saveNotification, coinsList, deleteNotification };
}