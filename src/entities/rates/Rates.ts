import { IStorage, storage } from "../../libraries/storage";
import { MobXRepository } from "../../store/MobXRepository";
import { IRate } from "./IRate";

export interface IRatesModel {
    lastUpdate: number;
    ralesList: IRate | null;
    firstRate: string;
    secondRate: string;
    rate: number;
}

class RatesModel implements IRatesModel {
    private lastUpdateStore = new MobXRepository<number>(Date.now());
    private firstRateStore = new MobXRepository<string>('USD');
    private secondRateStore = new MobXRepository<string>('EUR');
    private ralesListStore = new MobXRepository<IRate>();

    constructor(private storage: IStorage) {
        this.load();
    }

    private persistRatesList = (data: IRate | null) => {
        Array.isArray(data) && this.storage.set('RATE_LIST', data);
    }

    private persistLastUpdate = (data: number) => {
        this.storage.set('LAST_UPDATE', data);
    }

    private persistFirstCurrency = (data: string) => {
        this.storage.set('FIRST_CURRENCY', data);
    }

    private persistSecondCurrency = (data: string) => {
        this.storage.set('SECOND_CURRENCY', data);
    }

    private load = () => {
        this.storage.get('RATE_LIST')
            .then(data => { data && this.ralesListStore.save(data); })
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
        return this.firstRateStore.data || 'USD';
    }

    set firstRate(data: string) {
        this.firstRateStore.save(data);
        this.persistFirstCurrency(data)
    }

    get secondRate() {
        return this.secondRateStore.data || 'EUR';
    }

    set secondRate(data: string) {
        this.secondRateStore.save(data);
        this.persistSecondCurrency(data)
    }

    get ralesList() {
        return this.ralesListStore.data;
    }

    set ralesList(data: IRate | null) {
        this.ralesListStore.save(data);
        this.persistRatesList(data);
    }

    get rate() {
        // @ts-ignore
        const rate = this.ralesList?.rates?.[this.secondRate] / this.ralesList?.rates?.[this.firstRate] || 0;
        return Math.ceil(rate * 10000) / 10000;
    }

}

export const ratesModel = new RatesModel(storage);
