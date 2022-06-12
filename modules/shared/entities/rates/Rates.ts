import { IStorage, storage } from "../../../../libraries/storage";
import { MobXRepository } from "../../../../src/store/MobXRepository";
import { IRateListItem } from "./IRateListItem";

export interface IRateListItemsModel {
    lastUpdate: number;
    ratesList: IRateListItem[];
    firstRate: IRateListItem;
    secondRate: IRateListItem;
    rate: number;
}

class RatesModel implements IRateListItemsModel {
    private lastUpdateStore = new MobXRepository<number>(Date.now());
    private firstRateStore = new MobXRepository<IRateListItem>();
    private secondRateStore = new MobXRepository<IRateListItem>();
    private ratesListStore = new MobXRepository<IRateListItem[]>();

    constructor(private storage: IStorage) {
        this.load();
    }

    private persistRatesList = (data: IRateListItem[]) => {
        Array.isArray(data) && this.storage.set('RATE_LIST', data);
    }

    private persistLastUpdate = (data: number) => {
        this.storage.set('LAST_UPDATE', data);
    }

    private persistFirstCurrency = (data: IRateListItem) => {
        this.storage.set('FIRST_CURRENCY', data);
    }

    private persistSecondCurrency = (data: IRateListItem) => {
        this.storage.set('SECOND_CURRENCY', data);
    }

    private load = () => {
        this.storage.get('RATE_LIST')
            .then(data => { data && this.ratesListStore.save(data); })
            .catch(error => console.warn('RatesModel -> RATE_LIST: ', error));
        this.storage.get('LAST_UPDATE')
            .then(data => { data && this.lastUpdateStore.save(data); })
            .catch(error => console.warn('RatesModel -> LAST_UPDATE: ', error));
        this.storage.get('FIRST_CURRENCY')
            .then(data => { data && this.firstRateStore.save(data); })
            .catch(error => console.warn('RatesModel -> FIRST_CURRENCY: ', error));
        this.storage.get('SECOND_CURRENCY')
            .then(data => { data && this.secondRateStore.save(data); })
            .catch(error => console.warn('RatesModel -> SECOND_CURRENCY: ', error));
    }

    get lastUpdate() {
        return this.lastUpdateStore.data as number;
    }

    set lastUpdate(data: number) {
        this.lastUpdateStore.save(data);
        this.persistLastUpdate(data);
    }

    get firstRate() {
        return this.firstRateStore.data || {} as IRateListItem;
    }

    set firstRate(data: IRateListItem) {
        this.firstRateStore.save(data);
        this.persistFirstCurrency(data)
    }

    get secondRate() {
        return this.secondRateStore.data || {} as IRateListItem;
    }

    set secondRate(data: IRateListItem) {
        this.secondRateStore.save(data);
        this.persistSecondCurrency(data)
    }

    get ratesList() {
        return this.ratesListStore.data ?? [];
    }

    set ratesList(data: IRateListItem[]) {
        this.ratesListStore.save(data);
        this.persistRatesList(data);
    }

    get rate() {
        const rate = this.firstRate?.current_price / this.secondRate?.current_price || 0;
        return Math.ceil(rate * 10000000) / 10000000;
    }

}

export const ratesModel = new RatesModel(storage);
