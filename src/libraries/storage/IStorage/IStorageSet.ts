export interface IStorageSet {
    set: (service: string, payload: object | string | number | boolean) => Promise<boolean>;
}
