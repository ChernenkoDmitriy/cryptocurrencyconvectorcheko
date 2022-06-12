import { IStorageCleanAll, IStorageGet, IStorageRemove, IStorageSet } from "..";

export interface IStorage extends IStorageGet, IStorageSet, IStorageRemove, IStorageCleanAll {

}
