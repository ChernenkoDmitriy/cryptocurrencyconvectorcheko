import React, { FC, memo, useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useUiContext } from '../../../../../src/UIProvider';
import { BUTTON_SIZE, getStyle } from './styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { settingsModel } from '../../../../shared/entities/settings/Settings';

interface IProps {
    icon?: React.ReactElement;
    doubleWidth?: boolean;
    color?: string;
    text: string;
    onPress: (value: string) => void;
}

export const ButtonsConvector: FC<IProps> = ({ icon, text, doubleWidth, color, onPress }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const onButtonPress = () => {
        onPress(text);
        settingsModel.vibration && ReactNativeHapticFeedback.trigger('impactMedium', { ignoreAndroidSystemSettings: true });
    }

    return (
        <TouchableOpacity
            onPress={onButtonPress}
            style={[
                styles.container,
                {
                    width: doubleWidth ? BUTTON_SIZE * 2 : BUTTON_SIZE,
                }
            ]}>
            {
                icon
                    ? icon
                    : <Text style={[styles.text, { color: color || colors.regularText }]}>{text}</Text>
            }
        </TouchableOpacity>
    );
};
