import { useEffect } from "react"
import { calculatorModel } from "../../shared/entities/calculator/Calculator";
import { ratesModel } from "../../shared/entities/rates/Rates";
import { getCoinsListUseCase } from "../useCases/getCoinsListUseCase";

export const useInitCurrency = () => {

    // useEffect(() => {
    //     getCoinsListUseCase();
    // }, [])

    useEffect(() => {
        calculatorModel.calculateRate();
    }, [ratesModel.firstRate, ratesModel.secondRate]);

}