export interface IStorageCleanOnFirstLaunch {
    cleanOnFirstLaunch: (servicesArray: Array<string>) => Promise<void>;
}
