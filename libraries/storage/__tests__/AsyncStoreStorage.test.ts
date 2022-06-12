import {describe, test, expect } from '@jest/globals';
import { AsyncStoreStorage } from "..";

jest.mock('@react-native-community/async-storage', () => {
    let cache: any = {};
    return {
        setItem: (key: any, value: any) => {
            return new Promise((resolve, reject) => {
                return (typeof key !== 'string' || typeof value !== 'string')
                    ? reject(new Error('key and value must be string'))
                    : resolve(cache[key] = value);
            });
        },
        getItem: (key: any, _value: any) => {
            return new Promise((resolve, reject) => {
                return cache.hasOwnProperty(key)
                    ? resolve(cache[key])
                    : reject(null);
            });
        },
        removeItem: (key: any) => {
            return new Promise((resolve, reject) => {
                return cache.hasOwnProperty(key)
                    ? resolve(delete cache[key])
                    : reject('No such key!');
            });
        },
        clear: (_key: any) => {
            return new Promise((resolve, _reject) => resolve(cache = {}));
        },

        getAllKeys: (_key: any) => {
            return new Promise((resolve, _reject) => resolve(Object.keys(cache)));
        },
    }
});

describe('AsyncStoreStorage', () => {
    const asyncStoreStorage = new AsyncStoreStorage();
    const secondAsyncStoreStorage = new AsyncStoreStorage();
    const service = 'service';
    const payload = { test: 'test' };
    test('get method', async () => {
        const result = await asyncStoreStorage.get(service);
        expect(result).toEqual(null);
    });
    test('set method', async () => {
        await asyncStoreStorage.set(service, payload);
        const result = await asyncStoreStorage.get(service);
        expect(result).toEqual(payload);
    });
    test('remove method', async () => {
        await asyncStoreStorage.remove(service);
        const result = await asyncStoreStorage.get(service);
        expect(result).toEqual(null);
    });
    test('remove method with wrong param', async () => {
        const result = await asyncStoreStorage.remove(null as any);
        expect(result).toEqual(false);
    });
    test('set method catch', async () => {
        const result = await asyncStoreStorage.set(null as any, '');
        expect(result).toEqual(false);
    });
    test('cleanAll method', async () => {
        await asyncStoreStorage.set(service, payload);
        const result = await asyncStoreStorage.get(service);
        expect(result).toEqual(payload);
        await asyncStoreStorage.cleanAll({ service: 'service' });
        const resultNull = await asyncStoreStorage.get(service);
        expect(resultNull).toEqual(null);
    });
    test('cleanAll method catch error', async () => {
        await secondAsyncStoreStorage.set(service, payload);
        await secondAsyncStoreStorage.cleanAll(null as any);
        const result = await secondAsyncStoreStorage.get(service);
        expect(result).toEqual(payload);
    });
})
