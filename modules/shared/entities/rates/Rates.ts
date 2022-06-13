import { IStorage, storage } from "../../../../libraries/storage";
import { MobXRepository } from "../../../../src/store/MobXRepository";
import { ICoin } from "./ICoin";
import { IRateListItem } from "./IRateListItem";

export interface IRateListItemsModel {
    ratesList: IRateListItem[];
    firstRate: ICoin;
    secondRate: ICoin;
    rate: number;
}

class RatesModel implements IRateListItemsModel {
    private firstRateStore = new MobXRepository<ICoin>();
    private secondRateStore = new MobXRepository<ICoin>();
    private ratesListStore = new MobXRepository<IRateListItem[]>();

    constructor(private storage: IStorage) {
        this.load();
    }

    private persistRatesList = (data: IRateListItem[]) => {
        Array.isArray(data) && this.storage.set('RATE_LIST', data);
    }

    private persistFirstCurrency = (data: ICoin) => {
        this.storage.set('FIRST_CURRENCY', data);
    }

    private persistSecondCurrency = (data: ICoin) => {
        this.storage.set('SECOND_CURRENCY', data);
    }

    private load = () => {
        this.storage.get('RATE_LIST')
            .then(data => { data && this.ratesListStore.save(data); })
            .catch(error => console.warn('RatesModel -> RATE_LIST: ', error));
        this.storage.get('FIRST_CURRENCY')
            .then(data => { data && this.firstRateStore.save(data); })
            .catch(error => console.warn('RatesModel -> FIRST_CURRENCY: ', error));
        this.storage.get('SECOND_CURRENCY')
            .then(data => { data && this.secondRateStore.save(data); })
            .catch(error => console.warn('RatesModel -> SECOND_CURRENCY: ', error));
    }

    get firstRate() {
        return this.firstRateStore.data || {} as ICoin;
    }

    set firstRate(data: ICoin) {
        this.firstRateStore.save(data);
        this.persistFirstCurrency(data)
    }

    get secondRate() {
        return this.secondRateStore.data || {} as ICoin;
    }

    set secondRate(data: ICoin) {
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
        const rate = this.firstRate?.market_data?.current_price[this.secondRate.symbol] || 0;
        return rate;
    }

}

export const ratesModel = new RatesModel(storage);
