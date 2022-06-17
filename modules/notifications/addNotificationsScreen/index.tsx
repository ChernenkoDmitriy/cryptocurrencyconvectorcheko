import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View } from 'react-native'
import { useUiContext } from '../../../src/UIProvider';
import { HeaderWithBackButton } from '../../shared/ui/headerWithBackButton';
import { getStyle } from './styles';
import { CurrencyPriceInput } from './components/currencyPriceInput';
import { ArrowUp } from '../../../assets/arrowUp/arrowUp';
import { ArrowDown } from '../../../assets/arrowDown/arrowDown';
import { NotificationActiveSwitch } from './components/notificationActiveSwitch';
import { NotificationSaveButton } from './components/notificationSaveButton';
import { ratesModel } from '../../shared/entities/rates/Rates';
import { NotificationCurrencyRow } from './components/notificationCurrencyRow';
import { useNotification } from '../presenter/useNotification';
import { notificationsModel } from '../../shared/entities/notifications/Notifications';
import { useValidation } from '../presenter/useValidation';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const AddNotificationsScreen: FC<IProps> = observer(({ navigation }) => {
    const [upNumber, setUpNumber] = useState('');
    const [downNumber, setDownNumber] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(false);

    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const { saveNotification, changeNotificationCurrency } = useNotification()
    const { validateButtonDisabled, validateInputs } = useValidation()

    useEffect(() => {
        changeNotificationCurrency(notificationsModel.chosenNotification || ratesModel.firstRate);
        setUpNumber(notificationsModel.chosenNotification.priceUp || '');
        setDownNumber(notificationsModel.chosenNotification.priceDown || '');
        setIsEnabled(notificationsModel.chosenNotification.isActive || false);
    }, [])

    useEffect(() => {
        validateButtonDisabled(upNumber, downNumber, setIsSaveDisabled)
    }, [upNumber, downNumber])

    const goToCurrencyList = () => {
        navigation.navigate('CURRENCY_LIST');
    }

    const onPressSave = () => {
        saveNotification(upNumber, downNumber, isEnabled)
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderWithBackButton title={t('notifications')} />
            <View style={styles.formContainer}>
                <View>
                    <NotificationCurrencyRow rate={ratesModel.firstRate} onPress={goToCurrencyList} />
                    <CurrencyPriceInput icon={<ArrowUp />} number={upNumber} setNumber={setUpNumber} validateInput={validateInputs} />
                    <CurrencyPriceInput icon={<ArrowDown />} number={downNumber} setNumber={setDownNumber} validateInput={validateInputs} />
                    <NotificationActiveSwitch isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
                </View>
                <NotificationSaveButton onPress={onPressSave} isDisable={isSaveDisabled} />
            </View>
        </SafeAreaView >
    );
});