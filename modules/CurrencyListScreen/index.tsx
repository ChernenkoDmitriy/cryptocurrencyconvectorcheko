import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ratesModel } from '../../src/entities/rates/Rates';
import { useUiContext } from '../../src/UIProvider';
import { CurrencyListItem } from '../components/currencyListItem';
import { Header } from '../components/header';
import { Search } from '../components/search';
import { useChoseCurrency } from '../presenter/useChoseCurrency';
import { getStyle } from './styles';

export const CurrencyListScreen: FC = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const { searchText, setSearchText, onChoseCurrency } = useChoseCurrency();

    const renderItem = ({ item }: any) => <CurrencyListItem name={item} onPress={onChoseCurrency} />;

    const data = useMemo(() => {
        const search = searchText.toLowerCase();
        const rates = Object.keys(ratesModel.ralesList?.rates || {});
        return rates.filter((item) =>
            item?.toLowerCase().includes(search) ||
            t(item).toLowerCase().includes(search))
    }, [ratesModel.ralesList, searchText]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title={t('currency')} />
            <Search value={searchText} onChangeText={setSearchText} />
            <FlatList
                initialNumToRender={20}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item}
            />
        </SafeAreaView>
    );
});
