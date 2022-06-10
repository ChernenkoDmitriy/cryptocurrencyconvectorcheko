import { MobXRepository } from "../MobXRepository";

describe('MobXRepository', () => {
    const nameStore = new MobXRepository<string>();
    test('save', () => {
        expect(nameStore.data).toEqual(null);
        nameStore.save('Bob');
        expect(nameStore.data).toEqual('Bob');
    });
})
