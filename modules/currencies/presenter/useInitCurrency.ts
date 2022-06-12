import { useEffect } from "react"
import { calculatorModel } from "../../shared/entities/calculator/Calculator";
import { ratesModel } from "../../shared/entities/rates/Rates";

export const useInitCurrency = () => {

    useEffect(() => {
        calculatorModel.calculateRate();
    }, [ratesModel.firstRate, ratesModel.secondRate]);

}