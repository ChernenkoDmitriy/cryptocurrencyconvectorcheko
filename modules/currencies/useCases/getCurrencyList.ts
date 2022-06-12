import { requester } from '../../../libraries/requester';
import { IRateListItem } from '../../shared/entities/rates/IRateListItem';

const fetchCurrency = async (page: number = 1) => {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=' + page + '&sparkline=false';
        const response = await requester.get(url);
        return response;
    } catch (error) {
        console.error('fetchCurrency ', error)
    }
}

const precessingResponse = (response: any): IRateListItem[] => {
    let ratesList: any = [];
    if (Array.isArray(response)) {
        ratesList = response;
    }
    return ratesList;
}

export const getCurrencyList = async (page: number): Promise<IRateListItem[]> => {
    try {
        const response = await fetchCurrency(page);
        const result = precessingResponse(response);
        return result;
    } catch (error) {
        console.error('getCurrencyList ', error)
        return [];
    }
}