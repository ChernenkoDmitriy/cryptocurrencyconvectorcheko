import React, { FC } from 'react';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../libraries/toast/toastConfig';
import { AppNavigator } from './navigation';
import { UIProvider } from './UIProvider';
// import mobileAds from 'react-native-google-mobile-ads';

// mobileAds()
//     .initialize()
//     .then(adapterStatuses => { });

export const App: FC = () => {

    return (
        <UIProvider>
            <AppNavigator />
            <Toast config={toastConfig} />
        </UIProvider>
    );
};
