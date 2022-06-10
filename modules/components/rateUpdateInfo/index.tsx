import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { ratesModel } from '../../../src/entities/rates/Rates';
import { useUiContext } from '../../../src/UIProvider';
import { getStyle } from './styles';

export const RateUpdateInfo: FC = observer(() => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const updateDate = moment(ratesModel.lastUpdate).format('DD.MM.YYYY HH:mm');

    const rate = Math.trunc(ratesModel.rate * 1000) / 1000

    return (
        <View style={styles.container}>
            <Text style={styles.timeText}>{updateDate}</Text>
            <View style={styles.rowWrapper}>
                <Text style={styles.rateText}>1</Text>
                <Text style={styles.rateText}>{ratesModel.firstRate}</Text>
                <Text style={styles.rateText}>=</Text>
                <Text style={styles.rateText}>{rate}</Text>
                <Text style={styles.rateText}>{ratesModel.secondRate}</Text>
            </View>
        </View >
    );
});
