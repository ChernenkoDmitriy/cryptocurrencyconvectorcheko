import { observer } from 'mobx-react';
import React, { FC, useCallback, useMemo } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useUiContext } from '../../../../src/UIProvider';
import { CurrencyListItem } from '../components/currencyListItem';
import { HeaderWithBackButton } from '../../../shared/ui/headerWithBackButton';
import { Search } from '../components/search';
import { useChoseCurrency } from '../../presenter/useChoseCurrency';
import { getStyle } from './styles';
import { IRateListItem } from '../../../shared/entities/rates/IRateListItem';
import { useCurrencyList } from '../../presenter/useCurrencyList';
import { ListBottomLoader } from '../components/listBottomLoader';
import { AdBanner } from '../../../shared/ui/adBanner';

export const CurrencyListScreen: FC = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const { rates, loading, searchRates, searchText, setSearchText, onEndReached } = useCurrencyList();
    const { onChoseCurrency } = useChoseCurrency();

    const renderItem = ({ item }: any) => <CurrencyListItem item={item} onPress={onChoseCurrency} />;

    const keyExtractor = useCallback((item: IRateListItem) => item.id + item.name, []);

    const data = searchText ? searchRates : rates;

    return (
        <SafeAreaView style={styles.container}>
            <HeaderWithBackButton title={t('currency')} />
            <Search value={searchText} onChangeText={setSearchText} />
            <FlatList
                initialNumToRender={20}
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onEndReached={onEndReached}
                ListFooterComponent={loading ? <ListBottomLoader /> : null}
            />
            <AdBanner />
        </SafeAreaView>
    );
});
