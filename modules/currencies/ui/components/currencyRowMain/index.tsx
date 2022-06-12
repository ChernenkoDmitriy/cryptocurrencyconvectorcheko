import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { calculatorModel } from '../../../../shared/entities/calculator/Calculator';
import { useUiContext } from '../../../../../src/UIProvider';
import { getStyle } from './styles';
import { IRateListItem } from '../../../../shared/entities/rates/IRateListItem';

interface IProps {
    rate: IRateListItem;
    isShowCalculation?: boolean;
    amount: string;
    onPress: () => void;
}

export const CurrencyRowMain: FC<IProps> = observer(({ rate, amount, onPress, isShowCalculation }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.containerLogo}>
                <Image source={{ uri: rate?.image }} style={styles.logo} resizeMode='stretch' />
                <Text style={styles.symbol}>{rate.symbol}</Text>
            </View>
            <View style={styles.textWrapper}>
                <Text numberOfLines={1} style={styles.calculationText}>
                    {!!calculatorModel.operator && isShowCalculation ? calculatorModel.operand + calculatorModel.operator : ''}
                </Text>
                <Text numberOfLines={1} style={styles.amountText}>{amount}</Text>
            </View>
        </TouchableOpacity>
    );
});
