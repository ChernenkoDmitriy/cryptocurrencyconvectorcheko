import { useEffect } from "react"
import { calculatorModel } from "../../shared/entities/calculator/Calculator";
import { ratesModel } from "../../shared/entities/rates/Rates";
import { getCoinUseCase } from "../useCases/getCoinUseCase";

export const useInitCurrency = () => {

    useEffect(() => {
        const interval = setInterval(() => {
            ratesModel.firstRate?.id && getCoinUseCase(ratesModel.firstRate?.id)
                .then(coin => {
                    if (coin) {
                        ratesModel.firstRate = coin;
                    }
                })
        }, 6000);
        return () => { interval && clearInterval(interval) };
    }, [])

    useEffect(() => {
        calculatorModel.calculateRate();
    }, [ratesModel.firstRate, ratesModel.secondRate]);

}