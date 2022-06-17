import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useMemo } from 'react';
import { View, Pressable, Text } from 'react-native';
import { ArrowBackIcon } from '../../../../assets/arrowBack';
import { useUiContext } from '../../../../src/UIProvider';
import { getStyle } from './styles';

interface Props {
    title?: string;
    onPressTittle?: () => void;
    isBackAvailable?: boolean;
    children?: React.ReactNode | React.ReactNode[];
}

export const HeaderWithBackButton: FC<Props> = ({ children, onPressTittle, title, isBackAvailable = true }) => {
    const { colors } = useUiContext();
    const navigation = useNavigation<any>();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const onGoBack = useCallback(() => {
        navigation.canGoBack() && navigation.goBack();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                {isBackAvailable && <Pressable
                    style={({ pressed }) => [styles.buttonBack, { opacity: pressed ? 0.5 : 1 }]}
                    onPress={onGoBack}
                >
                    <ArrowBackIcon color={colors.icon} />
                </Pressable>}
                {!!title &&
                    <View style={styles.titleContainer}>
                        <Pressable style={({ pressed }) => [styles.titleContainerButton, { opacity: pressed ? 0.5 : 1 }]} disabled={!onPressTittle} onPress={onPressTittle}>
                            <Text style={styles.title} numberOfLines={1}>{title}</Text>
                        </Pressable>
                    </View>
                }
                {children}
            </View>
        </View>
    )
}
