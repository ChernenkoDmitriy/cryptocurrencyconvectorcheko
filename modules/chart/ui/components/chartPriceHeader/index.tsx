import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useUiContext } from '../../../../../src/UIProvider';
import { formatNumberWithDelimiters } from '../../../../../src/utils';
import { ratesModel } from '../../../../shared/entities/rates/Rates';
import { getStyle } from './styles';

export const ChartPriceHeader: FC = observer(({ }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const percentPriceChange = Math.round(ratesModel.firstRate.market_data.price_change_percentage_24h * 100) / 100;

    return (
        <View style={styles.container}>
            <Text style={styles.price}>${formatNumberWithDelimiters(ratesModel.rate)} </Text>
            <Text style={[styles.percentRate, { color: percentPriceChange >= 0 ? colors.positiveRate : colors.negativeRate }]}>
                {percentPriceChange}%
            </Text>
            <View style={styles.logoWrapper}>
                <FastImage source={{ uri: ratesModel.firstRate?.image?.small }} style={styles.logo} resizeMode='stretch' />
            </View>
        </View>
    );
});
