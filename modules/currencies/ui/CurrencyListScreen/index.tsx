import { observer } from 'mobx-react';
import React, { FC, useCallback, useMemo } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useUiContext } from '../../../../src/UIProvider';
import { CurrencyListItem } from '../components/currencyListItem';
import { Header } from '../../../shared/ui/header';
import { Search } from '../components/search';
import { useChoseCurrency } from '../../presenter/useChoseCurrency';
import { getStyle } from './styles';
import { IRateListItem } from '../../../shared/entities/rates/IRateListItem';
import { useCurrencyList } from '../../presenter/useCurrencyList';
import { ListBottomLoader } from '../components/listBottomLoader';

export const CurrencyListScreen: FC = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const { rates, onEndReached } = useCurrencyList();
    const { searchText, setSearchText, onChoseCurrency } = useChoseCurrency();

    const renderItem = ({ item }: any) => <CurrencyListItem item={item} onPress={onChoseCurrency} />;

    const keyExtractor = useCallback((item: IRateListItem) => item.id + item.name, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header title={t('currency')} />
            <Search value={searchText} onChangeText={setSearchText} />
            <FlatList
                initialNumToRender={20}
                data={rates}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onEndReached={onEndReached}
                ListFooterComponent={<ListBottomLoader />}
            />
        </SafeAreaView>
    );
});
