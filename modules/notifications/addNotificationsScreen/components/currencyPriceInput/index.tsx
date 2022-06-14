import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { FC, ReactComponentElement, useMemo, useState } from 'react';
import { TextInput, View } from 'react-native'
import { getStyle } from './styles';
import { useUiContext } from '../../../../../src/UIProvider';

interface IProps {
    icon: ReactComponentElement<any>
}

export const CurrencyPriceInput: FC<IProps> = observer(({ icon }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const [number, onChangeNumber] = useState();

    return (
        <View style={styles.container}>
            <TextInput
                //@ts-ignore
                onChangeText={onChangeNumber}
                value={number}
                placeholder="USD"
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor={colors.subText}
            />
            <View style={styles.icon}>
                {icon}
            </View>
        </View>
    );
});
