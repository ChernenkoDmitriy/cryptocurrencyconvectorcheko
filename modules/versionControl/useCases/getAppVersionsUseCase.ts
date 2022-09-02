import { requester } from "../../../libraries/requester";

const fetchAppVersions = async (): Promise<any> => {
    const url = 'https://cryptocurrencyconvectorchekojs.herokuapp.com/version';
    const response = await requester.get(url);
    return response;
}

export const getAppVersionsUseCase = async () => {
    try {
        const response = await fetchAppVersions();
        if (response) {
            return response
        }
    } catch (error) {
        console.warn('workerAppVersions', error);
    }
}