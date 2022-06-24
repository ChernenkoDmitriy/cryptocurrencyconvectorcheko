import { useEffect } from "react"
import { IRateListItem } from "../../shared/entities/rates/IRateListItem";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { useSafeState } from "../../shared/hooks/useSafeState";
import { getCurrencyList } from "../useCases/getCurrencyList";
import { searchCoinUseCase } from "../useCases/searchCoinUseCase";

export const useCurrencyList = () => {
    const [rates, setRates] = useSafeState<IRateListItem[]>([]);
    const [page, setPage] = useSafeState(1);
    const [loading, setLoading] = useSafeState(true);
    const [searchRates, setSearchRates] = useSafeState<any[]>([]);
    const [searchText, setSearchText] = useSafeState('');

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