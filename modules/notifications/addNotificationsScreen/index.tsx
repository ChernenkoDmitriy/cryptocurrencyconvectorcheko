import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { FC, useMemo, useState } from 'react';
import { SafeAreaView, View } from 'react-native'
import { useUiContext } from '../../../src/UIProvider';
import { Header } from '../../shared/ui/header';
import { getStyle } from './styles';
import { CurrencyPriceInput } from './components/currencyPriceInput';
import { ArrowUp } from '../../../assets/arrowUp/arrowUp';
import { ArrowDown } from '../../../assets/arrowDown/arrowDown';
import { NotificationActiveSwitch } from './components/notificationActiveSwitch';
import { NotificationSaveButton } from './components/notificationSaveButton';
import { ratesModel } from '../../shared/entities/rates/Rates';
import { NotificationCurrencyRow } from './components/notificationCurrencyRow';
import { useNotification } from '../presenter/useNotification';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const AddNotificationsScreen: FC<IProps> = observer(({ navigation }) => {
    const [upNumber, setUpNumber] = useState('');
    const [downNumber, setDownNumber] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);

    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const { saveNotification } = useNotification()

    const goToCurrencyList = () => {
        navigation.navigate('CURRENCY_LIST');
    }

    const onPressSave = () => {
        saveNotification(upNumber, downNumber, isEnabled)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={t('notifications')} />
            <View style={styles.formContainer}>
                <View>
                    <NotificationCurrencyRow rate={ratesModel.firstRate} onPress={goToCurrencyList} />
                    <CurrencyPriceInput icon={<ArrowUp />} number={upNumber} setNumber={setUpNumber} />
                    <CurrencyPriceInput icon={<ArrowDown />} number={downNumber} setNumber={setDownNumber} />
                    <NotificationActiveSwitch isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
                </View>
                <NotificationSaveButton onPress={onPressSave} />
            </View>
        </SafeAreaView >
    );
});
