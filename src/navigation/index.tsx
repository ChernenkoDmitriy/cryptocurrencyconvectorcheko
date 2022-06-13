import React, { FC } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CurrencyListScreen } from '../../modules/currencies/ui/CurrencyListScreen';
import { SettingsScreen } from '../../modules/SettingsScreen';
import { useUiContext } from '../UIProvider';
import { InformationScreen } from '../../modules/InformationScreen';
import { ConvectorScreen } from '../../modules/currencies/ui/ConvectorScreen';
import { SecondCurrencyListScreen } from '../../modules/currencies/ui/SecondCurrencyList';
import { NotificationsScreen } from '../../modules/notifications/notificationsScreen';

const Stack = createStackNavigator();

export const AppNavigator: FC = () => {
    const { colors } = useUiContext();

    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <StatusBar backgroundColor={'#000'} />
            <NavigationContainer theme={{ colors: {} } as any}>
                <Stack.Navigator screenOptions={{ headerShown: false, detachPreviousScreen: false }}>
                    <Stack.Screen name="CONVECTOR" component={ConvectorScreen} />
                    <Stack.Screen name="CURRENCY_LIST" component={CurrencyListScreen} />
                    <Stack.Screen name="SECOND_CURRENCY_LIST" component={SecondCurrencyListScreen} />
                    <Stack.Screen name="NOTIFICATIONS" component={NotificationsScreen} />
                    <Stack.Screen name="SETTINGS" component={SettingsScreen} />
                    <Stack.Screen name="INFORMATION" component={InformationScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}
