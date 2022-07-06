import { notificationHandler } from "../../../libraries/notificationService/NotificationHandler"
import { requester } from "../../../libraries/requester"
import { storage } from "../../../libraries/storage"
import { INotificationsListItem } from "../../shared/entities/notifications/INotificationsListItem"
import { ICoin } from "../../shared/entities/rates/ICoin"

const getPersistanceNotifications = async (): Promise<INotificationsListItem[] | null> => {
    const result = await storage.get('NOTIFICATIONS_LIST');
    return result;
}

const generateCoinsIds = (notifications: INotificationsListItem[]) => {
    const coins: string[] = [];
    notifications.forEach(notification => {
        if (!coins.includes(notification.coin)) {
            coins.push(notification.coin);
        }
    });
    const coinsString = coins.join(',');
    return coinsString;
}

const getCoins = async (coinsIds: string): Promise<ICoin[]> => {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + coinsIds + '&order=market_cap_desc&sparkline=false';
        const response = await requester.get(url);
        return response;
    } catch (error) {
        console.error('fetchNotificationsCoins ', error)
        return []
    }
}

const disableNotifications = async (notificationsToDisableList: INotificationsListItem[]) => {
    const notifications = await getPersistanceNotifications();
    let notificationsList = notifications || []
    notificationsToDisableList.forEach(notificationToDisable => {
        notificationsList = notificationsList.map(notification => (
            notification.id === notificationToDisable.id
                ? {
                    ...notification,
                    isActive: false
                } : notification
        ))
    })
    await storage.set('NOTIFICATIONS_LIST', notificationsList)
}

const notifyClient = (notifications: INotificationsListItem[], coins: ICoin[]) => {
    const notificationsToDisable: INotificationsListItem[] = []
    notifications.forEach((notification: INotificationsListItem) => {
        coins.forEach((coin: ICoin) => {
            if (notification.coin === coin.id && notification.isActive) {
                const messageUp = coin.symbol.toUpperCase() + ' ' + coin.current_price + '$'
                const arrowUpLink = 'https://lh3.googleusercontent.com/pw/AM-JKLWnuWh_tUYurnfdtITTJfrSTU3HaDh7rmYOS27iTIRhaYopBDodIIVAcLaP-b_qvowgOZxN-bJLWPr7cS7i12scT5p6iRnrw3X_pMFk40UwRPmzvpNsspUlSBt3nch279NmCRd_cX_-oGpu_W1lmZFC=w340-h220-no?authuser=0'
                const messageDown = coin.symbol.toUpperCase() + ' ' + coin.current_price + '$'
                const arrowDownLink = 'https://lh3.googleusercontent.com/pw/AM-JKLXLlkGQ_ru_p6_hZ29bjmFGTjsiXy2p-cOO01MTGJUkHA6Hu0_mgTs5Y0JmGZ6kE7AyRljwFB2J-eDSxkH7sq3_WC897d3pfgxTiR7gFPIwtlzejKztZgG6TsOx5_09INH1HUSQMeG-jNae-mJTF1uj=w340-h220-no?authuser=0'
                if (coin.current_price >= Number(notification.priceUp) && notification.priceUp) {
                    notificationHandler.createLocalNotification(coin.name, messageUp, arrowUpLink)
                    notificationsToDisable.push(notification)
                } else if (coin.current_price <= Number(notification.priceDown) && notification.priceDown) {
                    notificationHandler.createLocalNotification(coin.name, messageDown, arrowDownLink)
                    notificationsToDisable.push(notification)
                }
            }
        })
    })
    disableNotifications(notificationsToDisable)
};

export const pushNotificationUseCase = async () => {
    const notifications = await getPersistanceNotifications();
    if (notifications) {
        const coinsIds = generateCoinsIds(notifications);
        const coins = await getCoins(coinsIds);
        notifyClient(notifications, coins)
    }
}