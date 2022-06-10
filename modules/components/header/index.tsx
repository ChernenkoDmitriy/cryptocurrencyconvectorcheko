import { useNavigation } from '@react-navigation/native';
import React, { FC, useMemo } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useUiContext } from '../../../src/UIProvider';
import { ArrowBackIcon } from '../../../assets/arrowBack';
import { getStyle } from './styles';

interface IProps {
    title: string;
}

export const Header: FC<IProps> = ({ title }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
                <ArrowBackIcon width={24} height={24} color={colors.iconColor} />
            </TouchableOpacity>
            <View style={styles.textWrapper}>
                <Text numberOfLines={1} style={styles.title}>{title}</Text>
            </View>
        </View>
    );
};
