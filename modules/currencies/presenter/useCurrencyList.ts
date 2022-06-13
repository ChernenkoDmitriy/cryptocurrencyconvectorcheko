import { useEffect, useState } from "react"
import { IRateListItem } from "../../shared/entities/rates/IRateListItem";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { getCurrencyList } from "../useCases/getCurrencyList";
import { searchCoinUseCase } from "../useCases/searchCoinUseCase";

export const useCurrencyList = () => {
    const [rates, setRates] = useState<IRateListItem[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchRates, setSearchRates] = useState<any[]>([]);
    const [searchText, setSearchText] = useState('');

    const onSearch = (text: string) => {
        setLoading(true);
        searchCoinUseCase(text)
            .then(coins => {
                setSearchRates(coins);
                setLoading(false);
            })
    }

    const { debouncedWrapper } = useDebounce(onSearch, 1000);

    useEffect(() => {
        if (searchText) {
            debouncedWrapper(searchText);
        }
    }, [searchText])


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

    return { rates, searchRates, loading, searchText, setSearchText, onEndReached };
}