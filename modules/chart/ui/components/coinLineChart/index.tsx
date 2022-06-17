import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { processColor, View } from 'react-native';
import { useUiContext } from '../../../../../src/UIProvider';
import { getStyle } from './styles';
import { LineChart } from 'react-native-charts-wrapper';
import moment from 'moment';

interface IProps {
    chartPeriod: string;
    chartData: { marker: string; shadowH: number; shadowL: number; open: number; close: number; }[];
}

const greenBlue = "rgb(26, 182, 151)";
const petrel = "rgb(59, 145, 153)";
const axisColor = processColor('#263845');

export const CoinLineChart: FC<IProps> = observer(({ chartPeriod, chartData }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const lineData = useMemo(() => {
        return chartData.map((item, index) => ({
            x: index,
            marker: item.marker,
            y: (item.open + item.close) / 2
        }))
    }, [chartData]);

    const valueFormatter = useMemo(() => {
        if (chartPeriod === '1') {
            return chartData.map((item) => (moment(Number(item.marker)).format('HH:mm')))
        } else {
            return chartData.map((item) => (moment(Number(item.marker)).format('DD MMM')))
        }
    }, [chartData, chartPeriod]);

    return (
        <LineChart
            style={styles.chart}
            data={{
                dataSets: [
                    {
                        values: lineData,
                        label: "",
                        config: {
                            drawValues: false,
                            highlightColor: processColor('transparent'),
                            lineWidth: 2,
                            drawCircles: false,
                            color: processColor(petrel),
                            drawFilled: true,
                            fillGradient: {
                                colors: [processColor(petrel), processColor(greenBlue)],
                                positions: [0, 0.5],
                                angle: 90,
                                orientation: "TOP_BOTTOM"
                            },
                            fillAlpha: 1000,
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
                textColor: processColor(colors.regularText),
                valueFormatter,
            }}
            yAxis={{
                right: { drawGridLines: false, enabled: true, textColor: processColor(colors.regularText), },
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
