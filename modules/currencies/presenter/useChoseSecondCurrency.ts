import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { calculatorModel } from "../../shared/entities/calculator/Calculator";
import { ICoin } from "../../shared/entities/rates/ICoin";
import { ratesModel } from "../../shared/entities/rates/Rates";

export const useChoseSecondCurrency = () => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation<any>();

    const onChoseCurrency = (value: string) => {
        calculatorModel.calculateClear();
        ratesModel.secondRate = { symbol: value } as ICoin;
        navigation.goBack();
    }

    const data = useMemo(() => {
        try {
            if (searchText) {
                return Object.entries(ratesModel.firstRate.market_data.current_price)
                    .filter(item => item[0].toLowerCase().includes(searchText.toLowerCase()))
                    .map(item => ({ symbol: item[0], rate: item[1] }));
            } else {
                return Object.entries(ratesModel.firstRate.market_data.current_price)
                    .map(item => ({ symbol: item[0], rate: item[1] }));
            }
        } catch (error) {
            return [];
        }
    }, [searchText]);

    return { data, searchText, onChoseCurrency, setSearchText };
}