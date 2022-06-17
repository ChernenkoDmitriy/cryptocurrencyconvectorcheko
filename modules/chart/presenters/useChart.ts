import { useEffect, useState } from "react";
import { getCoinUseCase } from "../../currencies/useCases/getCoinUseCase";
import { ratesModel } from "../../shared/entities/rates/Rates";
import { getChartUseCase } from "../useCases/getChartUseCase";

export const useChart = () => {
    const [chartPeriod, setChartPeriod] = useState('7');
    const [chartType, setChartType] = useState<'candle' | 'line'>('line');
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        getChartUseCase(ratesModel.firstRate.id, chartPeriod)
            .then(data => setChartData(data));
        getCoinUseCase(ratesModel.firstRate?.id)
            .then(coin => {
                if (coin) {
                    ratesModel.firstRate = coin;
                }
            });
    }, []);

    const onChangeChartType = (type: 'candle' | 'line') => {
        setChartType(type);
    }

    const onChangeChartPeriod = (period: string) => {
        setChartPeriod(period);
        getChartUseCase(ratesModel.firstRate.id, period)
            .then(data => setChartData(data));
    }

    return { chartData, chartPeriod, chartType, onChangeChartType, onChangeChartPeriod };
}