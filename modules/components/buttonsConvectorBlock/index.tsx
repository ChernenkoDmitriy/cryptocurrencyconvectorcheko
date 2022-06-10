import React, { FC, memo, useMemo } from 'react';
import { View } from 'react-native';
import { BackspaceIcon } from '../../../assets/backspaceIcon';
import { DivideIcon } from '../../../assets/divideIcon';
import { EqualIcon } from '../../../assets/equalIcon';
import { MinusIcon } from '../../../assets/MinusIcon';
import { ExchangeIcon } from '../../../assets/exchangeIcon';
import { MultiplyIcon } from '../../../assets/multiplyIcon';
import { ResetCalculateIcon } from '../../../assets/resetCalculateIcon';
import { calculatorModel } from '../../../src/entities/calculator/Calculator';
import { useUiContext } from '../../../src/UIProvider';
import { useChoseCurrency } from '../../presenter/useChoseCurrency';
import { ButtonsConvector } from '../buttonConvector';
import { getStyle } from './styles';
import { PlusIcon } from '../../../assets/plusIcon';

export const ButtonsConvectorBlock: FC = memo(() => {
    const { colors } = useUiContext();
    const { onChoseOppositeCurrency } = useChoseCurrency();
    const styles = useMemo(() => getStyle(colors), [colors])

    const onPressNumber = (value: string) => {
        if (calculatorModel.firstRateRow.length < 14) {
            if (value === '.' && calculatorModel.firstRateRow.includes('.') ||
                calculatorModel.firstRateRow === '0' && calculatorModel.firstRateRow.length === 1 && value === '0') {
                return;
            } else if (calculatorModel.firstRateRow === '0' && calculatorModel.firstRateRow.length === 1 && value !== '.') {
                calculatorModel.firstRateRow = value;
            } else {
                calculatorModel.firstRateRow = calculatorModel.firstRateRow + value;
            }
        }
    }

    const onPressOperator = (value: string) => {
        calculatorModel.operator = value;
    }

    const onPressResult = () => {
        calculatorModel.calculateResult();
    }

    const onPressClear = () => {
        calculatorModel.calculateClear();
    }

    const onPressDelete = () => {
        calculatorModel.calculateDelete();
    }

    const BUTTONS = useMemo(() => [
        { color: colors.buttonNumber, icon: <ResetCalculateIcon color={colors.buttonNumber} />, text: 'C', onPress: onPressClear },
        { color: colors.buttonNumber, icon: <BackspaceIcon color={colors.buttonNumber} />, text: '<', onPress: onPressDelete },
        { color: colors.buttonNumber, icon: <ExchangeIcon color={colors.buttonNumber} />, text: '||', onPress: onChoseOppositeCurrency },
        { color: colors.buttonNumber, icon: <DivideIcon color={colors.buttonNumber} />, text: '/', onPress: onPressOperator },
        { text: '7', onPress: onPressNumber },
        { text: '8', onPress: onPressNumber },
        { text: '9', onPress: onPressNumber },
        { color: colors.buttonNumber, icon: <MultiplyIcon color={colors.buttonNumber} />, text: '*', onPress: onPressOperator },
        { text: '4', onPress: onPressNumber },
        { text: '5', onPress: onPressNumber },
        { text: '6', onPress: onPressNumber },
        { color: colors.buttonNumber, icon: <MinusIcon color={colors.buttonNumber} />, text: '-', onPress: onPressOperator },
        { text: '1', onPress: onPressNumber },
        { text: '2', onPress: onPressNumber },
        { text: '3', onPress: onPressNumber },
        { color: colors.buttonNumber, icon: <PlusIcon color={colors.buttonNumber} />, text: '+', onPress: onPressOperator },
        { text: '0', doubleWidth: true, onPress: onPressNumber },
        { text: '.', onPress: onPressNumber },
        { color: colors.buttonNumber, icon: <EqualIcon color={colors.buttonNumber} />, text: '=', onPress: onPressResult },
    ], [colors]);

    return (
        <View style={styles.container}>
            {BUTTONS.map((item) => <ButtonsConvector key={item.text} {...item} />)}
        </View>
    );
});
