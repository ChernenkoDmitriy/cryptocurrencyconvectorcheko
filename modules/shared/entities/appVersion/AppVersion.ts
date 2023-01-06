import { IStorage, storage } from "../../../../libraries/storage";
import { MobXRepository } from "../../../../src/store/MobXRepository";
import { IAppVersion } from "./IAppVersion";

export interface IAppVersionModel {

}

class AppVersionModel implements IAppVersionModel {
    private appVersionStore = new MobXRepository<IAppVersion | null>(null);

    constructor(private storage: IStorage) {

    }

    get appVersion() {
        return this.appVersionStore.data || null;
    }

    set appVersion(data: IAppVersion | null) {
        this.appVersionStore.save(data)
    }

}

export const appVersionModel = new AppVersionModel(storage);