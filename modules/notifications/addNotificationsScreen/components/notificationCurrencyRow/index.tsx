import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useUiContext } from '../../../../../src/UIProvider';
import { getStyle } from './styles';
import { ICoin } from '../../../../shared/entities/rates/ICoin';

interface IProps {
    rate: ICoin;
    onPress: () => void;
}

export const NotificationCurrencyRow: FC<IProps> = observer(({ rate, onPress }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.containerLogo}>
                {!!rate?.image?.small && <Image source={{ uri: rate?.image?.small }} style={styles.logo} resizeMode='stretch' />}
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.coinName}>{rate.name}</Text>
            </View>
        </TouchableOpacity>
    );
});
