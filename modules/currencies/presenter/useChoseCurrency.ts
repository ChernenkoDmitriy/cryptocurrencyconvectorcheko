import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { calculatorModel } from "../../shared/entities/calculator/Calculator";
import { IRateListItem } from "../../shared/entities/rates/IRateListItem";
import { ratesModel } from "../../shared/entities/rates/Rates";
import { getCoinUseCase } from "../useCases/getCoinUseCase";

export const useChoseCurrency = () => {
    const [isRateLoading, setIsRateLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation<any>();
    const isFirst = useRoute<any>().params?.isFirst;

    const onRefreshRates = async () => {

    }

    const onChoseOppositeCurrency = () => {
        let tempCurrency = ratesModel.firstRate;
        ratesModel.firstRate = ratesModel.secondRate;
        ratesModel.secondRate = tempCurrency;
        calculatorModel.calculateRate();
    }

    const onChoseCurrency = (value: IRateListItem) => {
        getCoinUseCase(value.id);
        navigation.goBack();
    }

    return { isRateLoading, searchText, onRefreshRates, setSearchText, onChoseCurrency, onChoseOppositeCurrency };

}