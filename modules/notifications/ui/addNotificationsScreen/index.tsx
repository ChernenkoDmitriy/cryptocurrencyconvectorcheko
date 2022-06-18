import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { Keyboard, KeyboardAvoidingView, SafeAreaView, View } from 'react-native'
import { useUiContext } from '../../../../src/UIProvider';
import { HeaderWithBackButton } from '../../../shared/ui/headerWithBackButton';
import { getStyle } from './styles';
import { CurrencyPriceInput } from '../components/currencyPriceInput';
import { ArrowUp } from '../../../../assets/arrowUp/arrowUp';
import { ArrowDown } from '../../../../assets/arrowDown/arrowDown';
import { NotificationActiveSwitch } from '../components/notificationActiveSwitch';
import { NotificationSaveButton } from '../components/notificationSaveButton';
import { useAddNotification } from '../../presenter/useAddNotification';
import { ChartPriceHeader } from '../../../chart/ui/components/chartPriceHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const AddNotificationsScreen: FC = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const { upNumber, downNumber, isEnabled, activateNotification, onChangeUpPrice,
        onChangeDownPrice, goToCurrencyList, onSaveNotification } = useAddNotification();

    return (
        <SafeAreaView style={styles.container}>
            <HeaderWithBackButton title={t('notifications')} />
            <View style={styles.contentWrapper} onStartShouldSetResponder={Keyboard.dismiss as any}>
                <TouchableOpacity onPress={goToCurrencyList} >
                    <ChartPriceHeader />
                </TouchableOpacity>
                <CurrencyPriceInput placeholder={'maxNotificationAmount'} icon={<ArrowUp />} value={upNumber} onChangeText={onChangeUpPrice} />
                <CurrencyPriceInput placeholder={'minNotificationAmount'} icon={<ArrowDown />} value={downNumber} onChangeText={onChangeDownPrice} />
                <NotificationActiveSwitch value={isEnabled} onChange={activateNotification} />
            </View>
            <NotificationSaveButton onPress={onSaveNotification} isDisable={(!!upNumber || !!downNumber)} />
        </SafeAreaView >
    );
});