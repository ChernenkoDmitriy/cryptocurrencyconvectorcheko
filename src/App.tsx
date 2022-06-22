import React, { FC, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../libraries/toast/toastConfig';
import { notificationsModel } from '../modules/shared/entities/notifications/Notifications';
import { AppNavigator } from './navigation';
import { UIProvider } from './UIProvider';
import messaging from '@react-native-firebase/messaging';
import { pushNotificatonUseCase } from '../modules/notifications/useCases/pushNotificationsUseCase';
import { getToken, requestUserPermission } from '../libraries/notificationService/NotificationHelper';

notificationsModel

export const App: FC = () => {
    useEffect(() => { getToken(), requestUserPermission() }, [])

    messaging().onMessage(pushNotificatonUseCase);

    return (
        <UIProvider>
            <AppNavigator />
            <Toast config={toastConfig} />
        </UIProvider>
    );
};

