import { useNavigation } from "@react-navigation/native";
import { calculatorModel } from "../../shared/entities/calculator/Calculator";
import { ICoinMarket } from "../../shared/entities/rates/ICoinMarket";
import { IRateListItem } from "../../shared/entities/rates/IRateListItem";
import { ratesModel } from "../../shared/entities/rates/Rates";
import { useSafeState } from "../../shared/hooks/useSafeState";
import { getCoinUseCase } from "../useCases/getCoinUseCase";

export const useChoseCurrency = () => {
    const [isRateLoading, setIsRateLoading] = useSafeState(false)
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
                    ratesModel.secondRate = { symbol: 'usd' } as ICoinMarket;
                }
            });
        navigation.goBack();
    }

    return { isRateLoading, onRefreshRates, onChoseCurrency };

}