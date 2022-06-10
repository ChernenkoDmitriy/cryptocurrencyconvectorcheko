import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { calculatorModel } from "../../src/entities/calculator/Calculator";
import { ratesModel } from "../../src/entities/rates/Rates";
import { fetchCurrency } from "../useCases/fetchCurrency";

export const useChoseCurrency = () => {
    const [isRateLoading, setIsRateLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation<any>();
    const isFirst = useRoute<any>().params?.isFirst;

    const onRefreshRates = async () => {
        setIsRateLoading(true);
        const response = await fetchCurrency();
        if (response?.result === 'success') {
            ratesModel.ralesList = response;
            ratesModel.lastUpdate = Date.now();
        }
        setTimeout(() => setIsRateLoading(false), 500)
    }

    const onChoseOppositeCurrency = () => {
        let tempCurrency = ratesModel.firstRate;
        ratesModel.firstRate = ratesModel.secondRate;
        ratesModel.secondRate = tempCurrency;
        calculatorModel.calculateRate();
    }

    const onChoseCurrency = (value: string) => {
        if (value === ratesModel.firstRate || value === ratesModel.secondRate) {
            onChoseOppositeCurrency();
        } else if (isFirst) {
            ratesModel.firstRate = value;
        } else {
            ratesModel.secondRate = value;
        }
        calculatorModel.calculateRate()
        navigation.goBack();
    }

    return { isRateLoading, searchText, onRefreshRates, setSearchText, onChoseCurrency, onChoseOppositeCurrency };

}