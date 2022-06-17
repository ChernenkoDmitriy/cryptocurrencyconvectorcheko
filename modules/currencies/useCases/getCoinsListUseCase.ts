import { requester } from "../../../libraries/requester";
import { ICoinListItem } from "../../shared/entities/rates/ICoinListItem";
import { ratesModel } from "../../shared/entities/rates/Rates";

const fetchCoinsList = async (page: number = 1) => {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/list';
        const response = await requester.get(url);
        return response;
    } catch (error) {
        console.error('fetchCoinsList ', error)
    }
}

const precessingResponse = (response: ICoinListItem[]) => {
    let result: any = {};
    if (Array.isArray(response)) {
        response.forEach(item => {
            result[item.symbol] = item;
        })
    }
    return result;
}

export const getCoinsListUseCase = async () => {
    const response = await fetchCoinsList();
    const list = precessingResponse(response);
    ratesModel.coinsList = list;
}