import { requester } from "../../../libraries/requester"
import { notificationsModel } from "../../shared/entities/notifications/Notifications"
import { ratesModel } from "../../shared/entities/rates/Rates"

const getCoinsString = () => {
    const coins: string[] = []
    notificationsModel.notificationsList.forEach(notification => {
        if (coins.includes(notification.coin)) {
            return
        } else {
            coins.push(notification.coin)
        }
    })
    const coinsString = coins.join(',')
    return coinsString
}

export const fetchNotificationsCoins = async () => {
    const coins = getCoinsString()
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + coins + '&order=market_cap_desc&sparkline=false';
        const response = await requester.get(url);
        return response;
    } catch (error) {
        console.error('fetchNotificationsCoins ', error)
    }
}

export const setEmptyNotification = () => {
    const randomId = String(Date.now())
    notificationsModel.chosenNotification = {numberId: Date.now(), comment: '', symbol: '', id: randomId, coin: ratesModel.firstRate.id, priceUp: '', priceDown: '', isActive: false }
} 