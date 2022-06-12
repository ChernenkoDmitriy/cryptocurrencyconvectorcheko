import React, { FC, useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useUiContext } from '../../../../../src/UIProvider';
import { getStyle } from './styles';


export const ListBottomLoader: FC = () => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={colors.accentText} />
        </View>
    );
}; 