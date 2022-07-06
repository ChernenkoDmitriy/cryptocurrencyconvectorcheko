interface IRequester {
    get: (url: string, options?: object) => Promise<any>;
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

}

export const requester = new Requester();