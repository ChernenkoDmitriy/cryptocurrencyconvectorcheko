import React, { FC, useMemo } from 'react';
import { Pressable } from 'react-native';
import { PlusIcon } from '../../../../assets/plusIcon';
import { useUiContext } from '../../../../src/UIProvider';
import { getStyle } from './styles';

interface Props {
    onPress: () => void;
    sign?: React.ReactNode;
}

export const CircleAbsoluteButton: FC<Props> = ({ onPress, sign }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, styles.container]}>
            {sign ? sign : <PlusIcon color={colors.icon} />}
        </Pressable>
    )
}
