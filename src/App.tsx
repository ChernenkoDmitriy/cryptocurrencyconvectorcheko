import React, { FC } from 'react';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../libraries/toast/toastConfig';
import { notificationsModel } from '../modules/shared/entities/notifications/Notifications';
import { AppNavigator } from './navigation';
import { UIProvider } from './UIProvider';
import mobileAds from 'react-native-google-mobile-ads';
import { withIAPContext } from 'react-native-iap';
import { purchaseModel } from '../modules/shared/entities/purchase/purchaseModel';

notificationsModel

mobileAds()
    .initialize()
    .then(adapterStatuses => { });

export const App: FC = withIAPContext(() => {
    purchaseModel;

    return (
        <UIProvider>
            <AppNavigator />
            <Toast config={toastConfig} />
        </UIProvider>
    );
});
