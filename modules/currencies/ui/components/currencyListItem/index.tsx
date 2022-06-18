import React, { FC, memo, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useUiContext } from '../../../../../src/UIProvider';
import { IRateListItem } from '../../../../shared/entities/rates/IRateListItem';
import { getStyle } from './styles';

interface IProps {
    item: IRateListItem;
    onPress: (value: IRateListItem) => void;
}

export const CurrencyListItem: FC<IProps> = memo(({ item, onPress }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const onHandlePress = () => {
        onPress(item);
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onHandlePress}>
            {!!item.image && <FastImage source={{ uri: item.image }} style={styles.logo} resizeMode='stretch' />}
            <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
            <View style={styles.textWrapper}>
                <Text numberOfLines={1} style={styles.price}>$ {item.current_price}</Text>
            </View>
        </TouchableOpacity>
    );
});
