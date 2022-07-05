import { observer } from 'mobx-react';
import React, { FC, useCallback, useMemo } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useUiContext } from '../../../../src/UIProvider';
import { HeaderWithBackButton } from '../../../shared/ui/headerWithBackButton';
import { Search } from '../components/search';
import { getStyle } from './styles';
import { SecondCurrencyListItem } from '../components/secondCurrencyListItem';
import { useChoseSecondCurrency } from '../../presenter/useChoseSecondCurrency';
import { AdBanner } from '../../../shared/ui/adBanner';

export const SecondCurrencyListScreen: FC = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const { data, searchText, setSearchText, onChoseCurrency } = useChoseSecondCurrency();

    const renderItem = ({ item }: any) => <SecondCurrencyListItem item={item} onPress={onChoseCurrency} />;

    const keyExtractor = useCallback((item: { symbol: string; rate: number; }) => item.symbol, []);

    return (
        <SafeAreaView style={styles.container}>
            <HeaderWithBackButton title={t('currency')} />
            <Search value={searchText} onChangeText={setSearchText} />
            <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />
            <AdBanner />
        </SafeAreaView>
    );
});
