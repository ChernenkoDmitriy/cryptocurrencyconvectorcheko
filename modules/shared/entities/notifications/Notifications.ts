import { IStorage, storage } from "../../../../libraries/storage";
import { MobXRepository } from "../../../../src/store/MobXRepository";
import { INotificationsListItem } from "./INotificationsListItem";

export interface INotificationsModel {

}

class NotificationsModel implements INotificationsModel {
    private notificationsStore = new MobXRepository<INotificationsListItem[]>();
    private chosenNotificationStore = new MobXRepository<INotificationsListItem>();

    constructor(private storage: IStorage) {
        this.load();
    }

    private load = () => {
        this.storage.get('NOTIFICATIONS_LIST')
            .then(data => { data && this.notificationsStore.save(data); })
            .catch(error => console.warn('NotificationsModel -> NOTIFICATIONS_LIST: ', error));
    }

    set notificationsList(data: INotificationsListItem[]) {
        this.notificationsStore.save(data);
        this.storage.set('NOTIFICATIONS_LIST', data);
    }

    get notificationsList() {
        return this.notificationsStore.data ?? [];
    }

    set chosenNotification(notification: INotificationsListItem) {
        this.chosenNotificationStore.save(notification);
    }

    get chosenNotification() {
        return this.chosenNotificationStore.data ?? { numberId: Date.now(), comment: '', symbol: '', id: 'emptyid', coin: 'bitcoin', priceUp: '', priceDown: '', isActive: false };
    }

}

export const notificationsModel = new NotificationsModel(storage);
