import { requester } from "../../../libraries/requester";

const fetchChart = async (id: string, period: string) => {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/' + id + '/ohlc?vs_currency=usd&days=' + period;
        const response = await requester.get(url);
        return response;
    } catch (error) {
        console.error('fetchCoinsList ', error);
        return [];
    }
}

const precessingResponse = (response: any): any[] => {
    let ratesList: any[] = [];
    if (Array.isArray(response)) {
        ratesList = response.map((item) => ({
            marker: String(item[0]),
            shadowH: item[2],
            shadowL: item[3],
            open: item[1],
            close: item[4]
        }));
    }
    return ratesList;
}


export const getChartUseCase = async (id: string, period: string) => {
    const result = await fetchChart(id, period);
    const data = precessingResponse(result);
    return data;
}