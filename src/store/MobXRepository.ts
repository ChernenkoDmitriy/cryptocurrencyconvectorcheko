import { action, makeAutoObservable, toJS } from 'mobx';
import { IRepository } from './IRepository';

export class MobXRepository<T> implements IRepository<T> {
    constructor(private initialValue?: T) {
        makeAutoObservable(this);
        if (typeof initialValue !== 'undefined') {
            this._data = this.initialValue as T;
        }
    }

    private _data: T | null = null;

    get data() {
        return toJS(this._data) ?? null;
    }

    @action save = (data: T | null): void => {
        this._data = data;
    }
}
