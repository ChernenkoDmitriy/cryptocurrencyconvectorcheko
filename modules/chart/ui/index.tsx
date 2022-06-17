import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import { useUiContext } from '../../../src/UIProvider';
import { ratesModel } from '../../shared/entities/rates/Rates';
import { HeaderWithBackButton } from '../../shared/ui/headerWithBackButton';
import { useChart } from '../presenters/useChart';
import { ChartPeriod } from './components/chartPeriod';
import { ChartPriceHeader } from './components/chartPriceHeader';
import { CoinCandleChart } from './components/coinCandleChart';
import { CoinLineChart } from './components/coinLineChart';
import { getStyle } from './styles';

export const ChartScreen: FC = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const { chartData, chartPeriod, chartType, onChangeChartType, onChangeChartPeriod } = useChart();

    return (
        <SafeAreaView style={styles.container}>
            <HeaderWithBackButton title={ratesModel.firstRate.name} />
            <ChartPriceHeader />
            {
                chartType === 'line'
                    ? <CoinLineChart chartData={chartData} chartPeriod={chartPeriod} />
                    : <CoinCandleChart chartData={chartData} chartPeriod={chartPeriod} />
            }
            <ChartPeriod {...{ chartPeriod, onChangeChartPeriod, chartType, onChangeChartType, }} />
        </SafeAreaView>
    );
});
