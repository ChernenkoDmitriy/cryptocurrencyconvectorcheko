import { useNavigation } from '@react-navigation/native';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BellIcon } from '../../../../../assets/bellIcon';
import { SettingsIcon } from '../../../../../assets/settingsIcon';
import { useUiContext } from '../../../../../src/UIProvider';
import { setEmptyNotification } from '../../../../notifications/useCases/getCoinsUseCase';
import { notificationsModel } from '../../../../shared/entities/notifications/Notifications';
import { RateUpdateInfo } from '../rateUpdateInfo';
import { getStyle } from './styles';
import { useNetInfo } from '@react-native-community/netinfo';
import { useShowToast } from '../../../../shared/hooks/useShowToast';

export const HeaderMain: FC = memo(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const navigation = useNavigation<any>();
    const { isConnected } = useNetInfo()
    const { showToast } = useShowToast()

    const onPressSettings = useCallback(() => {
        navigation.navigate('SETTINGS');
    }, []);

    const onPressNotifications = useCallback(() => {
        if (isConnected) {
            setEmptyNotification()
            if (notificationsModel.notificationsList.length === 0) {
                navigation.navigate('ADD_NOTIFICATIONS');
            } else {
                navigation.navigate('NOTIFICATIONS');
            }
        } else {
            showToast()
        }
    }, [isConnected]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPressSettings}>
                <SettingsIcon color={colors.icon} />
            </TouchableOpacity>
            <RateUpdateInfo />
            <View style={styles.buttonsWrapper}>
                <TouchableOpacity style={styles.button} onPress={onPressNotifications}>
                    <BellIcon color={colors.icon} />
                </TouchableOpacity>
            </View>
        </View >
    );
});
