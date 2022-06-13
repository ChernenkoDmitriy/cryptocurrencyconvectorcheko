import { requester } from '../../../libraries/requester';
import { ICoin } from '../../shared/entities/rates/ICoin';

const fetchCoin = async (coinId: string) => {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/' + coinId + '?tickers=false&community_data=false&developer_data=false&sparkline=false';
        const response = await requester.get(url);
        return response;
    } catch (error) {
        console.error('fetchCurrency ', error)
    }
}

const precessingResponse = (response: any): ICoin | null => {
    let ratesList: ICoin | null = null;
    if (response?.id) {
        ratesList = response;
    }
    return ratesList;
}

export const getCoinUseCase = async (coinId: string): Promise<ICoin | null> => {
    try {
        const response = await fetchCoin(coinId);
        const result = precessingResponse(response);
        return result;
    } catch (error) {
        console.error('getCoinUseCase ', error)
        return null;
    }
}