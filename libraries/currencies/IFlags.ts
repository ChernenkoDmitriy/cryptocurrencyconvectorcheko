export interface IFlags {
	getFlag: (key: string) => any;
	getFlagByCurrency: (key: string) => any;
	getAllFlags: () => object;
}
