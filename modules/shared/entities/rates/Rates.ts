import { IStorage, storage } from '../../../../libraries/storage';
import { MobXRepository } from '../../../../src/store/MobXRepository';
import { getCoinUseCase } from '../../../currencies/useCases/getCoinUseCase';
import { ICoinListItem } from './ICoinListItem';
import { ICoinMarket } from './ICoinMarket';

export interface IRateListItemsModel {
    firstRate: ICoinMarket;
    secondRate: ICoinMarket;
    rate: number;
    coinsList: { [key: string]: ICoinListItem };
}

class RatesModel implements IRateListItemsModel {
    private firstRateStore = new MobXRepository<ICoinMarket>();
    private secondRateStore = new MobXRepository<ICoinMarket>({ symbol: 'usd' } as ICoinMarket);
    private coinsListStore = new MobXRepository<{ [key: string]: ICoinListItem }>();

    constructor(private storage: IStorage) {
        this.load();
    }
    private persistFirstCurrency = (data: ICoinMarket) => {
        this.storage.set('FIRST_CURRENCY', data);
    };

    private persistSecondCurrency = (data: ICoinMarket) => {
        this.storage.set('SECOND_CURRENCY', data);
    };

    private load = () => {
        this.storage
            .get('FIRST_CURRENCY')
            .then(data => {
                if (data) {
                    this.firstRateStore.save(data);
                }
                getCoinUseCase(this.firstRate?.id || 'bitcoin')
                    .then(coin => {
                        if (coin) {
                            ratesModel.firstRate = coin;
                            ratesModel.secondRate = { symbol: 'usd' } as ICoinMarket;
                        }
                    });

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

    get rate() {
        const rate =
            this.firstRate?.market_data?.current_price[this.secondRate.symbol] || 0;
        return rate;
    }
}

export const ratesModel = new RatesModel(storage);
