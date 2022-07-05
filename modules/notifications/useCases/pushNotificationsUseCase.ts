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
                const arrowUpLink = 'https://lh3.googleusercontent.com/TYC-z_8K_E0UOAj1IyKywtK8EeBPzUholFdDIgPXYX0b-23uMgwbJIKXNpD08FO3B49glKTa8i4sICJZM3H2WSTucytQ6WPkJFq3mGfS-cIZtrs7jeXmtpYK8P_ELjH6KYfwNqzpuzE65sIPEviWl9z_5FaaMhWn03bYA-lfm-V4PIN6oou9AUAfR2ep1eojnQLHlljf4K4ZmsYW4M6g_wn2FwE1e7qfSvI7vH8IX75H9xXBh4OpdGnz5n1Ass-euYSIHO99LSEe5EK6PcFBm-9CK-4FV9IDm0MGdHv4VSJTI-lRHkqQ1HFZ9M06urFS-MRYPaQq-dctA_QEi2IAf6NifMNWN3--4t9D1rEpp0D3ugcflFippqT40EfpLCIm9vIOVpLclGzmLI7NUseEX5_6i877g9XL-bNKLXiNDdJi1qymFp0zhdgFb-MJUG4AQgf6kStHA9YlauIjVclz-9uZnmOXeF5a_CM0rcsh6ZeSL1sz10px9mt5vkXt8rKsVciC4Eo-XadIsLxfW7YWWBJstEMfEADkzR60sIvf8ZFzOjopPAkCvIeMEyj_GnWy1bpvgcdiMmEQKBC8W4qZv2hJGAttVMHuPqWEowqaas_wG9h6vjQwPMStOxmj3RZmXvvxLArT_AYhT2XM0yQQurv-Ayd3dZ9iJtlFGEjCdFhMTpC9mQP22Ybvp5ITxx815hScypiMyBwrq2CbKaQ5waZUq8sadQdYMCOlKPKDPP-a1tY-ikcz0UE597iXFOgPAVAWer8T2xapyoUU4025J33DtszbGWtSLdaFu3OpTfpucxR9gymEYLBzLJi7nuUZQVcejTVm=w340-h220-no?authuser=0'
                const messageDown = coin.symbol.toUpperCase() + ' ' + coin.current_price + '$'
                const arrowDownLink = 'https://lh3.googleusercontent.com/lIHTgfC_SsLeRAJszXnTa4VDIf6RePcgjvJNFknfqaneMQ3eEqImYTsTGgtIc42ltvjMwdpke9smreM6GqH26SRtwA9XhK3SKVwpOgPmBBOxSZDm5TjnDbCCOPAOriBFG7i1ZE97I6ggs6opsVnT9BcOZm8GZjN6BluGgRKj77uKs7w0BOp2Lf8o861XBJH2IZrG0GP4Efz4ja1ssBlBU56yGt5sPXRPyB8p-MOt-e_4gw0rhypARuhQvXdbt41p-yD085bT_Z5FMNhtqImzcU-VRp04oYvxBBFioaTOhaZqvSHuKYIzE4z0_xDwQK0atT2kZoAKiNFo62E_ZW7ayJljZ7b9kpZ9Trgj3RlWbDDX63eVUzLsan3jf73MnWS2WmKjckHAECw_rGJeAWK2Nlp4BGxwWAt6jvhEFsofvrkrKjLa_rqVmlMKKGRxHCnf3oFGHC5GiJDAbvZnEiQhjbR7NJjSeUTKKLYI-EikU4cuCI0aCh-Opt_T-u5S1Pmf3Xl-9c8yiOU5HodN66O_FQNTKOniFScwAEhdHB6-diDPeaR9TRLcWww_OFAx_5jeo7dRmIdFfY9G-PEUOIcuISwdx_3I7pIMwMDO-vhS13AHo5gAisAyUF9FwPZIhbIPPEt39XVk4GcgkLlNoGBaUnyglgfp7nVM_gbBISQBdMfzXtxVCpX0WkojCaP1N2jcLgSd50TbB01W4gFzVtKI1TIRvefMhuGaV4T6HB7nKrO0EcfMup7cKN0_vTLvLloSm63x09e-hJ6krjR16ybVBMMFjVApK-hTH7cISsltCihKiJNU43XrSA9UNoxD8GJwd61AIg9j=w340-h220-no?authuser=0'
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