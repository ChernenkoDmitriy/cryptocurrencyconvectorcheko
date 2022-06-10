import { requester } from '../../src/libraries/requester';

export const fetchCurrency = async (currency: string = 'USD') => {
    try {
        const url = 'https://open.er-api.com/v6/latest/' + currency;
        const response = await requester.get(url);
        return response;
    } catch (error) {
        console.error('fetchCurrencyList ', error)
    }

}