export interface IStorageGet {
    get: (service: string) => Promise<any>;
}