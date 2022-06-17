import { IStorage, storage } from '../../../../libraries/storage';
import { MobXRepository } from '../../../../src/store/MobXRepository';
import { ICoinListItem } from './ICoinListItem';
import { ICoinMarket } from './ICoinMarket';
import { IRateListItem } from './IRateListItem';

export interface IRateListItemsModel {
    ratesList: IRateListItem[];
    firstRate: ICoinMarket;
    secondRate: ICoinMarket;
    rate: number;
    coinsList: { [key: string]: ICoinListItem };
}

class RatesModel implements IRateListItemsModel {
    private firstRateStore = new MobXRepository<ICoinMarket>();
    private secondRateStore = new MobXRepository<ICoinMarket>();
    private ratesListStore = new MobXRepository<IRateListItem[]>();
    private coinsListStore = new MobXRepository<{ [key: string]: ICoinListItem }>();

    constructor(private storage: IStorage) {
        this.load();
    }

    private persistRatesList = (data: IRateListItem[]) => {
        Array.isArray(data) && this.storage.set('RATE_LIST', data);
    };

    private persistFirstCurrency = (data: ICoinMarket) => {
        this.storage.set('FIRST_CURRENCY', data);
    };

    private persistSecondCurrency = (data: ICoinMarket) => {
        this.storage.set('SECOND_CURRENCY', data);
    };

    private load = () => {
        this.storage
            .get('RATE_LIST')
            .then(data => {
                data && this.ratesListStore.save(data);
            })
            .catch(error => console.warn('RatesModel -> RATE_LIST: ', error));
        this.storage
            .get('FIRST_CURRENCY')
            .then(data => {
                data && this.firstRateStore.save(data);
            })
            .catch(error => console.warn('RatesModel -> FIRST_CURRENCY: ', error));
        this.storage
            .get('SECOND_CURRENCY')
            .then(data => {
                data && this.secondRateStore.save(data);
            })
            .catch(error => console.warn('RatesModel -> SECOND_CURRENCY: ', error));
    };

    get coinsList() {
        return this.coinsListStore.data || {} as { [key: string]: ICoinListItem };
    }

    set coinsList(data: { [key: string]: ICoinListItem }) {
        this.coinsListStore.save(data);
    }

    get firstRate() {
        return this.firstRateStore.data || ({} as ICoinMarket);
    }

    set firstRate(data: ICoinMarket) {
        this.firstRateStore.save(data);
        this.persistFirstCurrency(data);
    }

    get secondRate() {
        return this.secondRateStore.data || ({} as ICoinMarket);
    }

    set secondRate(data: ICoinMarket) {
        this.secondRateStore.save(data);
        this.persistSecondCurrency(data);
    }

    get ratesList() {
        return this.ratesListStore.data ?? [];
    }

    set ratesList(data: IRateListItem[]) {
        this.ratesListStore.save(data);
        this.persistRatesList(data);
    }

    get rate() {
        const rate =
            this.firstRate?.market_data?.current_price[this.secondRate.symbol] || 0;
        return rate;
    }
}

export const ratesModel = new RatesModel(storage);
