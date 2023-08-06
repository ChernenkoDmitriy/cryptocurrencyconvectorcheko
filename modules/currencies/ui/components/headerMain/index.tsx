import { useNavigation } from '@react-navigation/native';
import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
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
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useInAppPurchase } from '../../../../shared/hooks/useInAppPurchase';
import { observer } from 'mobx-react';
import { purchaseModel } from '../../../../shared/entities/purchase/purchaseModel';
import { CustomAlert } from '../../../../shared/ui/customAlert';
import { useDebounce } from '../../../../shared/hooks/useDebounce';

export const HeaderMain: FC = observer(() => {
    const { colors, t } = useUiContext();
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const styles = useMemo(() => getStyle(colors), [colors]);
    const navigation = useNavigation<any>();
    const { isConnected } = useNetInfo();
    const { showToast } = useShowToast();
    const rotate = useSharedValue(0);
    const { purchaseNotifications, connected, purchaseHistory } = useInAppPurchase();

    const onStartOpen = () => {
        onOpenModal();
    }

    const { debouncedWrapper: onOpenModalDebounced, cancelDebounce } = useDebounce(onStartOpen, 3000);

    useEffect(() => {
        if (connected && !purchaseHistory.length) {
            onOpenModalDebounced();
        } else {
            cancelDebounce();
        }
    }, [connected, purchaseHistory]);

    useEffect(() => {
        const interval = setInterval(() => {
            rotate.value = withSequence(
                withTiming(-15, { duration: 50 }),
                withRepeat(withTiming(15, { duration: 100 }), 6, true),
                withTiming(0, { duration: 50 })
            );
        }, 8000);
        return () => { interval && clearInterval(interval) };
    }, [])

    const onCloseModal = () => {
        setIsPaymentVisible(false);
    }

    const onOpenModal = () => {
        setIsPaymentVisible(true);
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotate.value}deg` },
            ],
        };
    });

    const onPressSettings = useCallback(() => {
        navigation.navigate('SETTINGS');
    }, []);

    const onPressNotifications = () => {
        if ((purchaseModel.isFreePeriod && purchaseModel.isHideTrialPeriod) || purchaseModel.purchaseHistory?.length) {
            if (isConnected) {
                setEmptyNotification()
                if (notificationsModel.notificationsList.length === 0) {
                    navigation.navigate('ADD_NOTIFICATIONS');
                } else {
                    navigation.navigate('NOTIFICATIONS');
                }
            } else {
                showToast();
            }
        } else {
            onOpenModal();
        }
    };

    const useTrialPeriod = () => {
        purchaseModel.isHideTrialPeriod = true;
        setEmptyNotification()
        if (notificationsModel.notificationsList.length === 0) {
            navigation.navigate('ADD_NOTIFICATIONS');
        } else {
            navigation.navigate('NOTIFICATIONS');
        }
        onCloseModal();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPressSettings}>
                <SettingsIcon color={colors.icon} />
            </TouchableOpacity>
            <RateUpdateInfo />
            <Animated.View style={[styles.buttonsWrapper, animatedStyles]}>
                <TouchableOpacity style={styles.button} onPress={onPressNotifications}>
                    <BellIcon color={colors.icon} width={26} height={26} />
                </TouchableOpacity>
            </Animated.View>
            <CustomAlert
                visible={isPaymentVisible}
                onCancel={onCloseModal}
                onPurchase={purchaseNotifications}
                onConfirm={useTrialPeriod}
                text={purchaseModel.isFreePeriod ? t('setCourseLimits') : t('freePeriodIsOver')}
                purchaseText={t('buyService')}
                confirmText={purchaseModel.isHideTrialPeriod ? '' : t('yseTrialPeriod')}
            />
        </View >
    );
});
