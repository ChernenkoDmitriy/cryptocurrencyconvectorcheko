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
    }, [])

    const saveNotification = (upNumber: string, downNumber: string, isActive: boolean) => {
        const notificationsList = [...notificationsModel.notificationsList, {
            coin: ratesModel.firstRate.id,
            priceUp: upNumber || null,
            priceDown: downNumber || null,
            isActive: isActive
        }]
        notificationsModel.notificationsList = notificationsList
        navigation.goBack()
    }


    return { saveNotification, coinsList };

}