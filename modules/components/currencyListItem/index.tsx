import React, { FC, memo, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { flags } from '../../../src/libraries/currencies/Flags';
import { useUiContext } from '../../../src/UIProvider';
import { getStyle } from './styles';

interface IProps {
    name: string;
    onPress: (value: string) => void;
}

export const CurrencyListItem: FC<IProps> = memo(({ name, onPress }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const image = flags.getFlagByCurrency(name);

    const onHandlePress = () => {
        onPress(name);
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onHandlePress}>
            <Image source={image} style={styles.logo} resizeMode='stretch' />
            <View style={styles.textWrapper}>
                <Text numberOfLines={1} style={styles.text}>{t(name)}</Text>
            </View>
            <Text numberOfLines={1} style={styles.symbol}>{name}</Text>
        </TouchableOpacity>
    );
});
