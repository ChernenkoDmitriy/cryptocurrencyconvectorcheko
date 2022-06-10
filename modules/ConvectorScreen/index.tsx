import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import { calculatorModel } from '../../src/entities/calculator/Calculator';
import { ratesModel } from '../../src/entities/rates/Rates';
import { useUiContext } from '../../src/UIProvider';
import { AdBanner } from '../components/adBanner';
import { ButtonsConvectorBlock } from '../components/buttonsConvectorBlock';
import { CurrencyRowMain } from '../components/currencyRowMain';
import { HeaderMain } from '../components/headerMain';
import { useInitCurrency } from '../presenter/useInitCurrency';
import { getStyle } from './styles';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const ConvectorScreen: FC<IProps> = observer(({ navigation }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    useInitCurrency();

    const goToCurrencyList = (isFirst?: boolean) => {
        navigation.navigate('CURRENCY_LIST', { isFirst });
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderMain />
            <CurrencyRowMain isShowCalculation currency={ratesModel.firstRate} amount={calculatorModel.firstRateRow} onPress={() => goToCurrencyList(true)} />
            <CurrencyRowMain currency={ratesModel.secondRate} amount={calculatorModel.secondRateRow} onPress={() => goToCurrencyList(false)} />
            <ButtonsConvectorBlock />
            <AdBanner />
        </SafeAreaView>
    );
});
