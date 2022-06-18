import React, { FC, useMemo } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUiContext } from '../../../../src/UIProvider';
import { getStyle } from './styles';

interface IProps {
    children: React.ReactNode;
    scrollEnabled?: boolean;
    keyboardShouldPersistTaps?: boolean;
}

export const ScreenContainer: FC<IProps> = ({ children, scrollEnabled = false, keyboardShouldPersistTaps = true }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <SafeAreaView style={styles.container} >
            {scrollEnabled
                ? <ScrollView
                    scrollEnabled={scrollEnabled}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                    style={styles.container}
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps={'handled'}
                >
                    {children}
                </ScrollView>
                : <View style={styles.container} onStartShouldSetResponder={keyboardShouldPersistTaps ? Keyboard.dismiss : undefined as any}>
                    {children}
                </View>}
        </SafeAreaView>
    );
};
