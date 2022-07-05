import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useUiContext } from '../../../src/UIProvider';
import { ratesModel } from '../../shared/entities/rates/Rates';
import { AdBanner } from '../../shared/ui/adBanner';
import { HeaderWithBackButton } from '../../shared/ui/headerWithBackButton';
import { ScreenContainer } from '../../shared/ui/screenContainer';
import { useChart } from '../presenters/useChart';
import { ChartPeriod } from './components/chartPeriod';
import { ChartPriceHeader } from './components/chartPriceHeader';
import { CoinCandleChart } from './components/coinCandleChart';
import { CoinInfo } from './components/coinInfo';
import { CoinLineChart } from './components/coinLineChart';
import { getStyle } from './styles';

export const ChartScreen: FC = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const { chartData, chartPeriod, chartType, onChangeChartType, onChangeChartPeriod } = useChart();

    return (
        <ScreenContainer >
            <HeaderWithBackButton title={ratesModel.firstRate.name} />
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <ChartPriceHeader />
                {
                    chartType === 'line'
                        ? <CoinLineChart chartData={chartData} chartPeriod={chartPeriod} />
                        : <CoinCandleChart chartData={chartData} chartPeriod={chartPeriod} />
                }
                <ChartPeriod {...{ chartPeriod, onChangeChartPeriod, chartType, onChangeChartType, }} />
                <CoinInfo />
            </ScrollView>
            <AdBanner />
        </ScreenContainer>
    );
});
