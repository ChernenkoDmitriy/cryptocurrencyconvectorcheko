import { MobXRepository } from "../../../../src/store/MobXRepository";
import { IRateListItemsModel, ratesModel } from "../rates/Rates";

export interface ICalculatorModel {
    firstRateRow: string;
    operator: string;
    readonly operand: string;
    readonly secondRateRow: string;
    calculateResult: () => void;
}

class CalculatorModel implements ICalculatorModel {
    private firstRateRowStore = new MobXRepository<string>('0');
    private secondRateRowStore = new MobXRepository<string>('0');
    private operandStore = new MobXRepository<string>('0');
    private operatorStore = new MobXRepository<string>('');

    constructor(private ratesModel: IRateListItemsModel) {

    }

    get firstRateRow() {
        return this.firstRateRowStore.data || '0';
    }

    set firstRateRow(data: string) {
        this.firstRateRowStore.save(data);
        this.calculateRate();
    }

    get secondRateRow() {
        return this.secondRateRowStore.data || '0';
    }

    get operator() {
        return this.operatorStore.data || '';
    }

    get operand() {
        return this.operandStore.data ?? '';
    }

    set operator(data: string) {
        if (this.operator) {
            this.calculateResult();
        }
        this.operatorStore.save(data);
        this.operandStore.save(this.firstRateRow);
        this.firstRateRow = '0';
    }

    calculateResult() {
        if (this.operator) {
            const calculatedResult = this.operandStore.data + this.operator + this.firstRateRow;
            const result = eval(calculatedResult);
            this.firstRateRow = String(Math.trunc(result * 100) / 100);
            this.operatorStore.save('');
        }
    }

    calculateClear() {
        this.firstRateRow = '0';
        this.secondRateRowStore.save('0');
        this.operandStore.save('0');
        this.operatorStore.save('');
    }

    calculateDelete() {
        if (this.firstRateRow.length === 1) {
            this.firstRateRow = '0';
        } else {
            this.firstRateRow = this.firstRateRow.slice(0, -1);
        }
    }

    calculateRate() {
        const calculatedAmount = Number(this.firstRateRow) * this.ratesModel.rate;
        this.secondRateRowStore.save(String(Math.trunc(calculatedAmount * 10000) / 10000));
    }

}

export const calculatorModel = new CalculatorModel(ratesModel);