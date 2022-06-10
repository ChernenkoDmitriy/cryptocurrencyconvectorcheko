export interface IStorageCleanAll {
    cleanAll: (services:object) => Promise<void>;
}