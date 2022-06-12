import { useEffect, useState } from "react"
import { IRateListItem } from "../../shared/entities/rates/IRateListItem";
import { getCurrencyList } from "../useCases/getCurrencyList";

export const useCurrencyList = () => {
    const [rates, setRates] = useState<IRateListItem[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrencyList(page)
            .then(result => {
                setRates(result);
                setLoading(false);
            });
    }, []);

    const onEndReached = () => {
        if (!loading) {
            const nextPage = page + 1;
            setLoading(true);
            getCurrencyList(nextPage)
                .then(result => {
                    setRates(prev => [...prev, ...result]);
                    setPage(nextPage);
                    setLoading(false);
                });
        }
    }

    console.log(rates.length)

    return { rates, loading, onEndReached };
}