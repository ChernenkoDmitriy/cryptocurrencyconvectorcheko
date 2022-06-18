import { observer } from 'mobx-react';
import React, { Dispatch, FC, ReactComponentElement, SetStateAction, useMemo } from 'react';
import { TextInput, View } from 'react-native'
import { getStyle } from './styles';
import { useUiContext } from '../../../../../src/UIProvider';

interface IProps {
    icon: ReactComponentElement<any>;
    number: string;
    setNumber: Dispatch<SetStateAction<string>>;
    validateInput: (existsValue: string, value: string, setValue: Dispatch<SetStateAction<string>>) => void
}

export const CurrencyPriceInput: FC<IProps> = observer(({ icon, number, setNumber, validateInput }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={(text) => validateInput(number, text, setNumber)}
                value={number}
                placeholder="USD"
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor={colors.inactiveText}
            />
            <View style={styles.icon}>
                {icon}
            </View>
        </View>
    );
});
