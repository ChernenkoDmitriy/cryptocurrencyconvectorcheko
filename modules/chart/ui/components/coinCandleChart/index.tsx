import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { processColor } from 'react-native';
import { useUiContext } from '../../../../../src/UIProvider';
import { getStyle } from './styles';
import { CandleStickChart } from 'react-native-charts-wrapper';
import moment from 'moment';

interface IProps {
    chartPeriod: string;
    chartData: { marker: string; shadowH: number; shadowL: number; open: number; close: number; }[];
}

const increaseColor = processColor('#357F2E');
const decreaseColor = processColor('#C72300');

export const CoinCandleChart: FC<IProps> = observer(({ chartPeriod, chartData }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const valueFormatter = useMemo(() => {
        if (chartPeriod === '1') {
            return chartData.map((item) => (moment(Number(item.marker)).format('HH:mm')))
        } else {
            return chartData.map((item) => (moment(Number(item.marker)).format('DD MMM')))
        }
    }, [chartData, chartPeriod]);

    return (
        <CandleStickChart
            style={styles.chart}
            data={{
                dataSets: [
                    {
                        values: chartData,
                        label: "",
                        config: {
                            increasingPaintStyle: 'FILL',
                            highlightColor: processColor('transparent'),
                            shadowColor: increaseColor,
                            shadowWidth: 1,
                            shadowColorSameAsCandle: true,
                            increasingColor: increaseColor,
                            decreasingColor: decreaseColor,
                            drawValues: false
                        }
                    },
                ]
            }}
            chartDescription={{ text: "" }}
            legend={{ enabled: false }}
            marker={{ enabled: false, }}
            xAxis={{
                drawLabels: true,
                enabled: true,
                drawGridLines: false,
                position: 'BOTTOM',
                yOffset: 5,
                valueFormatter,
                textColor: processColor(colors.regularText),
            }}
            yAxis={{
                right: { drawGridLines: true, enabled: true, textColor: processColor(colors.regularText), },
                left: { drawGridLines: false, enabled: false, drawLabels: false, },
            }}
            autoScaleMinMaxEnabled={true}
            animation={{ durationX: 0, durationY: 1000, easingY: "EaseInOutQuart" }}
            drawGridBackground={false}
            drawBorders={false}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={false}
            pinchZoom={false}
            doubleTapToZoomEnabled={false}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            keepPositionOnRotation={false}
            visibleRange={{ x: { min: 10 } }}
        />
    );
});
