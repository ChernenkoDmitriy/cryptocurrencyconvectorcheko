import { useEffect } from "react"
import { calculatorModel } from "../../src/entities/calculator/Calculator";
import { ratesModel } from "../../src/entities/rates/Rates";
import { fetchCurrency } from "../useCases/fetchCurrency";

export const useInitCurrency = () => {

    useEffect(() => {
        calculatorModel.calculateRate();
    }, [ratesModel.firstRate, ratesModel.secondRate]);

    const loadCurrencies = async () => {
        const response = await fetchCurrency();
        if (response?.result === 'success') {
            ratesModel.ralesList = response;
            ratesModel.lastUpdate = Date.now();
        }
    }

    useEffect(() => {
        loadCurrencies();
    }, []);

}