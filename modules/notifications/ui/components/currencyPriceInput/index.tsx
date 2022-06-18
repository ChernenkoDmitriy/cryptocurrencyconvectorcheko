import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { TextInput, View } from 'react-native'
import { getStyle } from './styles';
import { useUiContext } from '../../../../../src/UIProvider';

interface IProps {
    icon: React.ReactNode;
    value: string;
    placeholder: string;
    onChangeText: (text: string) => void;
}

export const CurrencyPriceInput: FC<IProps> = observer(({ placeholder, icon, value, onChangeText }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder ? t(placeholder) : ''}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor={colors.inactiveText}
            />
            <View style={styles.icon}>{icon}</View>
        </View>
    );
});
