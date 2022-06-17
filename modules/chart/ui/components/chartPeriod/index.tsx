import React, { FC, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CandleChartIcon } from '../../../../../assets/svg/candleChartIcon';
import { LineChartIcon } from '../../../../../assets/svg/lineChartIcon';
import { useUiContext } from '../../../../../src/UIProvider';
import { getStyle } from './styles';

interface IProps {
    chartType: 'candle' | 'line';
    onChangeChartType: (type: 'candle' | 'line') => void;
    chartPeriod: string;
    onChangeChartPeriod: (period: string) => void;
}

export const ChartPeriod: FC<IProps> = ({ chartPeriod, chartType, onChangeChartPeriod, onChangeChartType }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: chartPeriod === '1' ? colors.accentColorLight : undefined }]}
                onPress={() => { onChangeChartPeriod('1') }}>
                <Text style={styles.periodText}>24{t('h').toUpperCase()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: chartPeriod === '7' ? colors.accentColorLight : undefined }]}
                onPress={() => { onChangeChartPeriod('7') }}>
                <Text style={styles.periodText}>7{t('d').toUpperCase()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: chartPeriod === '30' ? colors.accentColorLight : undefined }]}
                onPress={() => { onChangeChartPeriod('30') }}>
                <Text style={styles.periodText}>1{t('m').toUpperCase()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: chartPeriod === '365' ? colors.accentColorLight : undefined }]}
                onPress={() => { onChangeChartPeriod('365') }}>
                <Text style={styles.periodText}>1{t('y').toUpperCase()}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
                style={[styles.button, { backgroundColor: chartType === 'line' ? colors.accentColorLight : undefined }]}
                onPress={() => { onChangeChartType('line') }}>
                <LineChartIcon color={colors.icon} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: chartType === 'candle' ? colors.accentColorLight : undefined }]}
                onPress={() => { onChangeChartType('candle') }}>
                <CandleChartIcon color={colors.icon} />
            </TouchableOpacity>
        </View>
    );
};
