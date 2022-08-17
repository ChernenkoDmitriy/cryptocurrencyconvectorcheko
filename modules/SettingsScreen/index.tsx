import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { FC, useMemo } from 'react';
import { SafeAreaView, Share, View } from 'react-native';
import { ColorThemeIcon } from '../../assets/colorThemeIcon';
import { InformationIcon } from '../../assets/informationIcon';
import { ShareIcon } from '../../assets/shareIcon';
import { VibrationIcon } from '../../assets/vibrationIcon';
import { settingsModel } from '../shared/entities/settings/Settings';
import { useUiContext } from '../../src/UIProvider';
import { HeaderWithBackButton } from '../shared/ui/headerWithBackButton';
import { ChoseLanguage } from './components/choseLanguage';
import { SettingButton } from './components/settingButton';
import { SettingButtonSwitch } from './components/settingButtonSwitch';
import { getStyle } from './styles';
import { AdBanner } from '../shared/ui/adBanner';

interface IProps {
    navigation: StackNavigationProp<any>;
}

export const SettingsScreen: FC<IProps> = observer(({ navigation }) => {
    const { colors, t, theme, saveTheme, setLocale } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const onChangeTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        saveTheme(nextTheme);
    }

    const onChangeVibration = () => {
        settingsModel.vibration = !settingsModel.vibration;
    }

    const onShare = () => {
        Share.share({ message: 'https://play.google.com/store/apps/details?id=com.cryptocurrencyconvectorcheko' });
    }

    const onChangeLanguage = (value: string) => {
        setLocale(value);
    }

    const onPressInformation = () => {
        navigation.navigate('INFORMATION');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <HeaderWithBackButton title={t('settings')} />
                <SettingButtonSwitch icon={<ColorThemeIcon color={colors.icon} />} value={theme === 'dark'} title={t('colorTheme')} description={t(theme)} onPress={onChangeTheme} />
                <SettingButtonSwitch icon={<VibrationIcon color={colors.icon} />} value={settingsModel.vibration} title={t('vibration')} onPress={onChangeVibration} />
                <ChoseLanguage onChangeLanguage={onChangeLanguage} />
                <SettingButton icon={<ShareIcon color={colors.icon} />} title={t('share')} onPress={onShare} />
                <SettingButton icon={<InformationIcon color={colors.icon} />} title={t('information')} onPress={onPressInformation} />
            </View>
            <AdBanner />
        </SafeAreaView>
    );
});
