export interface IRepository<T> {
    readonly data: T | null;

    save(data: T | null): void;
}
