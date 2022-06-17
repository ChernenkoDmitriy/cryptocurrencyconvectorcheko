import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { calculatorModel } from "../../shared/entities/calculator/Calculator";
import { ICoin } from "../../shared/entities/rates/ICoin";
import { IRateListItem } from "../../shared/entities/rates/IRateListItem";
import { ratesModel } from "../../shared/entities/rates/Rates";
import { getCoinUseCase } from "../useCases/getCoinUseCase";

export const useChoseCurrency = () => {
    const [isRateLoading, setIsRateLoading] = useState(false)
    const navigation = useNavigation<any>();

    const onRefreshRates = async () => {
        setIsRateLoading(true);
        getCoinUseCase(ratesModel.firstRate?.id)
            .then(coin => {
                if (coin) {
                    ratesModel.firstRate = coin;
                }
            })
            .finally(() => setIsRateLoading(false));
    }

    const onChoseCurrency = (value: IRateListItem) => {
        calculatorModel.calculateClear();
        getCoinUseCase(value.id)
            .then(coin => {
                if (coin) {
                    ratesModel.firstRate = coin;
                    ratesModel.secondRate = { symbol: 'usd' } as ICoin;
                }
            });
        navigation.goBack();
    }

    return { isRateLoading, onRefreshRates, onChoseCurrency };

}