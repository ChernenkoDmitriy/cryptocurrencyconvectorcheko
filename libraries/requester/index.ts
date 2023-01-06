import Axios from "axios";

interface IRequester {
    get: (url: string, options?: object) => Promise<any>;
    post: (url: string, data?: object, headers?: object, timeoutMS?: number) => Promise<any>;
}

class Requester implements IRequester {

    get = async (url: string, options?: object) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Cache-Control': 'no-cache',
                }
            });
            return response.json();
        } catch (error) {
            console.error('Requester -> get: ', error);
            return null;
        }
    }

    post = async (url: string, data?: object, headers?: object, timeoutMS?: number): Promise<any> => {
        try {
            const config: any = {
                method: 'POST',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                },
                url,
                timeout: timeoutMS || 60000
            };
            headers && (config.headers = headers);
            data && (config.data = JSON.stringify(data));
            const response = await Axios(config);
            return { data: response.data, status: response.status };
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.warn('AxiosRequester -> post: ', error.message);
            return error?.response?.data || error;
        }
    }

}

export const requester = new Requester();