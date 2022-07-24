import { IStorage, storage } from "../../../../libraries/storage";
import { MobXRepository } from "../../../../src/store/MobXRepository";
import AppInstallDate from 'react-native-app-install-date';

export interface IPurchaseModel {
    isFreePeriod: boolean;
    purchaseHistory: any[];
}

const FREE_PERIOD_DAYS = 3;

class PurchaseModel implements IPurchaseModel {
    private isFreePeriodRepository = new MobXRepository<boolean>(false);
    private purchaseHistoryRepository = new MobXRepository<any>(false);

    constructor(private storage: IStorage) {
        this.load();
        this.getIsFreePeriod();
    }

    private load = () => {
        this.storage.get('PURCHASE_HISTORY')
            .then(data => { data && this.purchaseHistoryRepository.save(data); })
            .catch(error => console.warn('PurchaseModel -> PURCHASE_HISTORY: ', error));
    }

    getIsFreePeriod = async () => {
        const instalTime = await AppInstallDate.getDateTime('yyyy/MM/dd');
        const instalTimeUnix = new Date(instalTime);
        instalTimeUnix.setDate(instalTimeUnix.getDate() + FREE_PERIOD_DAYS);
        if (instalTimeUnix.getTime() > Date.now()) {
            this.isFreePeriodRepository.save(true);
        }
    }

    get isFreePeriod() {
        return this.isFreePeriodRepository.data ?? false;
    }

    get purchaseHistory() {
        return this.purchaseHistoryRepository.data ?? [];
    }

    set purchaseHistory(data: any) {
        this.purchaseHistoryRepository.save(data);
        this.storage.set('PURCHASE_HISTORY', data);
    }

}

export const purchaseModel = new PurchaseModel(storage);
