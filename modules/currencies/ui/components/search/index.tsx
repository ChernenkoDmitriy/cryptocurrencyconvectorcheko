import React, { FC, useMemo } from 'react';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { useUiContext } from '../../../../../src/UIProvider';
import { getStyle } from './styles';

interface IProps {
    value: string;
    onChangeText: (value: string) => void;
}

export const Search: FC<IProps> = ({ value, onChangeText }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const onClearSearch = () => {
        onChangeText('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={onChangeText}
                    value={value}
                    style={styles.input}
                    placeholder={t('search')}
                    placeholderTextColor={colors.regularText}
                />
            </View>
            {!!value && <TouchableOpacity style={styles.buttonDelete} onPress={onClearSearch} >
                <Text style={styles.text}>{t('cancel')}</Text>
            </TouchableOpacity>}
        </View>
    );
};
