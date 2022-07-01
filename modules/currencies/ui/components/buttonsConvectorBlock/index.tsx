import React, { FC, memo, useMemo } from 'react';
import { View } from 'react-native';
import { BackspaceIcon } from '../../../../../assets/backspaceIcon';
import { DivideIcon } from '../../../../../assets/divideIcon';
import { EqualIcon } from '../../../../../assets/equalIcon';
import { MinusIcon } from '../../../../../assets/MinusIcon';
import { MultiplyIcon } from '../../../../../assets/multiplyIcon';
import { ResetCalculateIcon } from '../../../../../assets/resetCalculateIcon';
import { calculatorModel } from '../../../../shared/entities/calculator/Calculator';
import { useUiContext } from '../../../../../src/UIProvider';
import { ButtonsConvector } from '../buttonConvector';
import { getStyle } from './styles';
import { PlusIcon } from '../../../../../assets/plusIcon';
import { ChartIcon } from '../../../../../assets/svg/chartIcon';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ratesModel } from '../../../../shared/entities/rates/Rates';
import { observer } from 'mobx-react';
import { useShowToast } from '../../../../shared/hooks/useShowToast';
import { useNetInfo } from '@react-native-community/netinfo';

export const ButtonsConvectorBlock: FC = observer(() => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const navigation = useNavigation<any>();
    const { isConnected } = useNetInfo()
    const { showToast } = useShowToast()

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

    const goToChart = () => {
        isConnected ? ratesModel.firstRate && navigation.navigate('CHART') : showToast();
    }

    const BUTTONS = [
        {
            color: colors.accentText, icon:
                <View style={styles.chartIcon}>
                    {!!ratesModel.firstRate?.image?.small && <FastImage source={{ uri: ratesModel.firstRate?.image?.small }} style={styles.logo} resizeMode='stretch' />}
                    <ChartIcon color={colors.buttonNumber} />
                </View>
            , text: 'chart', onPress: goToChart
        },
        { color: colors.accentText, icon: <ResetCalculateIcon color={colors.buttonNumber} />, text: 'C', onPress: onPressClear },
        { color: colors.buttonNumber, icon: <BackspaceIcon color={colors.buttonNumber} />, text: '<', onPress: onPressDelete },
        // { color: colors.buttonNumber, icon: <ExchangeIcon color={colors.buttonNumber} />, text: '||', onPress: () => { } },
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
    ];

    return (
        <View style={styles.container}>
            {BUTTONS.map((item) => <ButtonsConvector key={item.text} {...item} />)}
        </View>
    );
});
