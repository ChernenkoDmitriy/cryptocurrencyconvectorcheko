import React, { FC, memo, useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useUiContext } from '../../../../../src/UIProvider';
import { getStyle } from './styles';

interface IProps {
    item: { symbol: string; rate: number; name: string; };
    onPress: (value: string) => void;
}

export const SecondCurrencyListItem: FC<IProps> = memo(({ item, onPress }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const onHandlePress = () => {
        onPress(item.symbol);
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onHandlePress}>
            <Text numberOfLines={1} style={styles.name}>{item.symbol?.toUpperCase()}</Text>
            <Text numberOfLines={1} style={styles.price}>$ {item.rate}</Text>
        </TouchableOpacity>
    );
});
