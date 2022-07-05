import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import { useUiContext } from '../../../../src/UIProvider';
import { calculatorModel } from '../../../shared/entities/calculator/Calculator';
import { ratesModel } from '../../../shared/entities/rates/Rates';
import { AdBanner } from '../../../shared/ui/adBanner';
import { useInitCurrency } from '../../presenter/useInitCurrency';
import { ButtonsConvectorBlock } from '../components/buttonsConvectorBlock';
import { CurrencyRowMain } from '../components/currencyRowMain';
import { HeaderMain } from '../components/headerMain';
import { getStyle } from './styles';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const ConvectorScreen: FC<IProps> = observer(({ navigation }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    useInitCurrency();

    const goToCurrencyList = () => {
        navigation.navigate('CURRENCY_LIST');
    }

    const goToSecondCurrencyList = () => {
        navigation.navigate('SECOND_CURRENCY_LIST');
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderMain />
            <CurrencyRowMain
                rate={ratesModel.firstRate}
                isShowCalculation
                amount={calculatorModel.firstRateRow}
                onPress={goToCurrencyList} />
            <CurrencyRowMain
                rate={ratesModel.secondRate}
                amount={calculatorModel.secondRateRow}
                onPress={goToSecondCurrencyList} />
            <ButtonsConvectorBlock />
            <AdBanner />
        </SafeAreaView>
    );
});
