import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { BellIcon } from '../../../../../assets/bellIcon';
import { SettingsIcon } from '../../../../../assets/settingsIcon';
import { UpdateIcon } from '../../../../../assets/updateIcon';
import { useUiContext } from '../../../../../src/UIProvider';
import { setEmptyNotification } from '../../../../notifications/useCases/getCoinsUseCase';
import { notificationsModel } from '../../../../shared/entities/notifications/Notifications';
import { useChoseCurrency } from '../../../presenter/useChoseCurrency';
import { RateUpdateInfo } from '../rateUpdateInfo';
import { getStyle } from './styles';

export const HeaderMain: FC = memo(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const navigation = useNavigation<any>();
    const { onRefreshRates, isRateLoading } = useChoseCurrency();
    const { isConnected } = useNetInfo();

    const onPressSettings = useCallback(() => {
        navigation.navigate('SETTINGS');
    }, []);

    const showToast = () => {
        Toast.show({
            type: 'netError',
            text1: t('toastTitle'),
            text2: t('toastSubTitle'),
            props: { colors }
        });
    }

    const onRefresh = () => {
        isConnected ? onRefreshRates() : showToast()
    }

    const onPressNotifications = useCallback(() => {
        setEmptyNotification()
        if (notificationsModel.notificationsList.length === 0) {
            navigation.navigate('ADD_NOTIFICATIONS');
        } else {
            navigation.navigate('NOTIFICATIONS');
        }
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPressSettings}>
                <SettingsIcon color={colors.iconColor} />
            </TouchableOpacity>
            <RateUpdateInfo />
            <View style={styles.buttonsWrapper}>
                {
                    <TouchableOpacity disabled={isRateLoading} style={styles.button} onPress={onRefresh}>
                        {isRateLoading
                            ? <ActivityIndicator size={'small'} color={colors.iconColor} />
                            : <UpdateIcon color={colors.iconColor} />}
                    </TouchableOpacity>
                }
                <TouchableOpacity style={styles.button} onPress={onPressNotifications}>
                    <BellIcon color={colors.iconColor} />
                </TouchableOpacity>
            </View>
        </View >
    );
});
