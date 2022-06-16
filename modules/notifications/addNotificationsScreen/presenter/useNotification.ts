import { useNavigation } from "@react-navigation/native"
import { notificationsModel } from "../../../shared/entities/notifications/Notifications"
import { ratesModel } from "../../../shared/entities/rates/Rates"

export const saveNotification = (upNumber: string, downNumber: string, isActive: boolean) => {
    const notificationsList = [...notificationsModel.notificationsList, {
        coin: ratesModel.firstRate.id,
        priceUp: upNumber || null,
        priceDown: downNumber || null,
        isActive: isActive
    }]
    notificationsModel.notificationsList = notificationsList
}

export const useNotification = () => {
    const navigation = useNavigation<any>();

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


    return { saveNotification };

}