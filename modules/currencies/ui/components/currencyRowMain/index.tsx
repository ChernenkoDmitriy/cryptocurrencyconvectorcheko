import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { calculatorModel } from '../../../../shared/entities/calculator/Calculator';
import { useUiContext } from '../../../../../src/UIProvider';
import { getStyle } from './styles';
import { ICoinMarket } from '../../../../shared/entities/rates/ICoinMarket';
import { useNavigation } from '@react-navigation/native';

interface IProps {
    rate: ICoinMarket;
    isShowCalculation?: boolean;
    amount: string;
    onPress: () => void;
}

export const CurrencyRowMain: FC<IProps> = observer(({ rate, amount, onPress, isShowCalculation }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const navigation = useNavigation<any>();

    const goToChart = () => {
        navigation.navigate('CHART');
    }

    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.container} onPress={onPress}>
                {/* <TouchableOpacity style={styles.chartButton} onPress={isShowCalculation ? goToChart : onPress}  > */}
                {/* {!!isShowCalculation && <ChartIcon color={colors.icon} />} */}
                <View style={styles.containerLogo}>
                {/* <View style={styles.containerLogo}> */}
                    {!!rate?.image?.small && <Image source={{ uri: rate?.image?.small }} style={styles.logo} resizeMode='stretch' />}
                    <Text style={styles.symbol}>{rate.symbol?.toUpperCase()}</Text>
                </View>
                {/* </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={onPress}> */}
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} style={styles.calculationText}>
                        {!!calculatorModel.operator && isShowCalculation ? calculatorModel.operand + calculatorModel.operator : ''}
                    </Text>
                    <Text numberOfLines={1} style={styles.amountText}>{amount}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
});
