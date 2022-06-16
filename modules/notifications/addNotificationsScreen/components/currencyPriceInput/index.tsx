import { observer } from 'mobx-react';
import React, { Dispatch, FC, ReactComponentElement, SetStateAction, useMemo } from 'react';
import { TextInput, View } from 'react-native'
import { getStyle } from './styles';
import { useUiContext } from '../../../../../src/UIProvider';

interface IProps {
    icon: ReactComponentElement<any>;
    number: string;
    setNumber: Dispatch<SetStateAction<string>>
}

export const CurrencyPriceInput: FC<IProps> = observer(({ icon, number, setNumber }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={setNumber}
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
