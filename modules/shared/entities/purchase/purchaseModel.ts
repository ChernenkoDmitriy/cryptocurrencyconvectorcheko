import { IStorage, storage } from "../../../../libraries/storage";
import { MobXRepository } from "../../../../src/store/MobXRepository";
// @ts-ignore
import AppInstallDate from 'react-native-app-install-date';
import moment from "moment";

export interface IPurchaseModel {
    isFreePeriod: boolean;
    isHideTrialPeriod: boolean;
    purchaseHistory: any[];
}

const FREE_PERIOD_DAYS = 3;

class PurchaseModel implements IPurchaseModel {
    private isHideTrialPeriodRepository = new MobXRepository<boolean>(false);
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
        this.storage.get('SHOW_TRIAL_PERIOD')
            .then(data => { data && this.isHideTrialPeriodRepository.save(data); })
            .catch(error => console.warn('PurchaseModel -> SHOW_TRIAL_PERIOD: ', error));
    }

    getIsFreePeriod = async () => {
        const instalTime = await AppInstallDate.getDateTime('yyyy/MM/dd HH:mm');
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

    get isHideTrialPeriod() {
        return this.isHideTrialPeriodRepository.data ?? false;
    }

    set isHideTrialPeriod(data: boolean) {
        this.isHideTrialPeriodRepository.save(data);
        this.storage.set('SHOW_TRIAL_PERIOD', data);
    }

}

export const purchaseModel = new PurchaseModel(storage);
