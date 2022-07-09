import React, { FC, useMemo } from 'react';
import { View, TextInput, ViewStyle, TextStyle } from 'react-native';
import { useUiContext } from '../../../../../src/UIProvider';
import { getStyle } from './styles';

interface Props {
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    onChangeText: (data: string) => void;
    value: string;
    placeholder: string;
    multiline?: boolean;
    autoFocus?: boolean;
}

export const CommentNotification: FC<Props> = ({ value, onChangeText, placeholder, containerStyle, multiline, inputStyle, autoFocus }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                autoFocus={autoFocus}
                multiline={multiline}
                placeholderTextColor={colors.inactiveText}
                style={[styles.textInput, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
            />
        </View>
    )
}
