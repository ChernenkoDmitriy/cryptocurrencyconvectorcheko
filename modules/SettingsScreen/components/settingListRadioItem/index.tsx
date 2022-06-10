import React, { FC, useMemo, memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; 
import { DoneIcon } from '../../../../assets/doneIcon';
import { useUiContext } from '../../../../src/UIProvider';
import { getStyle } from './styles';

interface IProps {
    isChosen: boolean;
    text: string;
    onPress: () => void;
}

export const SettingListRadioItem: FC<IProps> = memo(({ onPress, text, isChosen }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors, isChosen), [colors, isChosen]);

    return (
        <TouchableOpacity onPress={onPress} >
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>{text}</Text>
                </View>
                {!!isChosen && <DoneIcon color={colors.accentText} />}
            </View>
        </TouchableOpacity>
    );
});
