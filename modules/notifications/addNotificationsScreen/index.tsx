import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { FC, useMemo, useState } from 'react';
import { SafeAreaView, View } from 'react-native'
import { useUiContext } from '../../../src/UIProvider';
import { Header } from '../../shared/ui/header';
import { getStyle } from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { CurrencyPriceInput } from './components/currencyPriceInput';
import { ArrowUp } from '../../../assets/arrowUp/arrowUp';
import { ArrowDown } from '../../../assets/arrowDown/arrowDown';
import { NotificationActiveSwitch } from './components/notificationActiveSwitch';
import { NotificationSaveButton } from './components/notificationSaveButton';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const AddNotificationsScreen: FC<IProps> = observer(() => {
    const [openDropDown, setOpenDropDown] = useState(false);
    const [dropDownValue, setDropDownValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banansdvxcva', value: 'bangdana' },
        { label: 'Banaxcvxcvna', value: 'bacvbnana' },
        { label: 'Banaxcvxcvna', value: 'banahjkna' },
        { label: 'Bafkhfvnana', value: 'basdfnana' },
        { label: 'Banergana', value: 'bankhgana' },
        { label: 'Banvhmcnana', value: 'banvxana' },
        { label: 'Barxfthnana', value: 'banasdfhvna' },
        { label: 'Bthj,.nanana', value: 'bananabcbmmv' },
        { label: 'Bzfdgbxanana', value: 'bahghkbnmnana' },
        { label: 'Banl/ml;/ana', value: 'basdfsdfnana' },
        { label: 'Baml;yuikana', value: 'bavbmvnnana' },
        { label: 'Barthnana', value: 'banandfhtha' },
        { label: 'Bal;jsrthnana', value: 'banadfgdfgna' },
        { label: 'Banrthana', value: 'banahknbna' },
        { label: 'Baertenana', value: 'bansfsdfana' },
    ]);

    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title={t('notifications')} />
            <View style={styles.formContainer}>
                <View>
                    <DropDownPicker
                        open={openDropDown}
                        value={dropDownValue}
                        items={items}
                        setOpen={setOpenDropDown}
                        setValue={setDropDownValue}
                        setItems={setItems}
                        searchable={true}
                        placeholder={t('chooseCrypto')}
                        searchPlaceholder={t('search')}
                        searchTextInputStyle={{ color: colors.regularText, fontFamily: 'Roboto-Regular' }}
                        placeholderStyle={{ color: colors.subText, fontFamily: 'Roboto-Regular' }}
                        searchTextInputProps={{ maxLength: 25 }}
                        searchPlaceholderTextColor={colors.subText}
                        style={styles.dropdown}
                        dropDownContainerStyle={{ backgroundColor: colors.inputBackground, borderWidth: 0 }}
                        textStyle={{ color: colors.regularText }}
                        searchContainerStyle={{ borderBottomColor: 'transparent' }}
                    />
                    <CurrencyPriceInput icon={<ArrowUp />} />
                    <CurrencyPriceInput icon={<ArrowDown />} />
                    <NotificationActiveSwitch />
                </View>
                <NotificationSaveButton />
            </View>
        </SafeAreaView >
    );
});
