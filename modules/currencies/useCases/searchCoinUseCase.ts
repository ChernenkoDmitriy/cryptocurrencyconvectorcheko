import { requester } from "../../../libraries/requester";

const fetchSearchCoin = async (search: string) => {
    try {
        const url = 'https://api.coingecko.com/api/v3/search?query=' + search;
        const response = await requester.get(url);
        return response;
    } catch (error) {
        console.error('fetchCurrency ', error)
    }
}

const precessingResponse = (response: any): object[] => {
    let ratesList: any = [];
    if (response?.coins) {
        ratesList = response.coins;
    }
    return ratesList;
}

export const searchCoinUseCase = async (search: string) => {
    try {
        const response = await fetchSearchCoin(search);
        const result = precessingResponse(response);
        return result;
    } catch (error) {
        console.error('getCoinUseCase ', error)
        return [];
    }
}