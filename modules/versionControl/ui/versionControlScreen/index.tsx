import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect, useMemo } from 'react';
import { View, Text, Linking, TouchableOpacity, Image } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getStyle } from './styles';
import semver from 'semver';
import { isIOS } from '../../../../src/utils';
import { getAppVersionsUseCase } from '../../useCases/getAppVersionsUseCase';
import { appVersionModel } from '../../../shared/entities/appVersion/AppVersion';
import { ScreenContainer } from '../../../shared/ui/screenContainer';
import { useUiContext } from '../../../../src/UIProvider';

interface IProps {
    navigation: StackNavigationProp<any>;
}

const IOS_STORE = '';
const ANDROID_STORE = 'https://play.google.com/store/apps/details?id=com.cryptocurrencyconvectorcheko&hl=ru&gl=US';

export const VersionControlScreen: FC<IProps> = ({ navigation }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    useEffect(() => {
        getAppVersionsUseCase().then((res) => {
            appVersionModel.appVersion = res
        })
    }, []);

    const isCanUpdateLater = useMemo(() => {
        const currentVersion = DeviceInfo.getVersion();
        const minVersion = isIOS ? appVersionModel.appVersion?.minIosVersion : appVersionModel.appVersion?.minAndroidVersion;
        return semver.gte(currentVersion, minVersion);
    }, []);

    const goUpdate = async () => {
        const isCanOpen = await Linking.canOpenURL(isIOS ? IOS_STORE : ANDROID_STORE);
        isCanOpen && Linking.openURL(isIOS ? IOS_STORE : ANDROID_STORE);
    };

    const onPressLater = async () => {
        navigation.navigate('CONVECTOR')
    };

    return (
        <ScreenContainer>
            <View style={styles.wrapper}>
                <Image style={styles.logoImage} source={require('../../../../assets/images/appLogoImage.png')} />
                <Text style={styles.title}>{t('applicationIsOutdated')}</Text>
                <Text style={styles.subTitle}>{t('updateToLatest')}</Text>
                <View style={styles.buttonsWrapper}>
                    {isCanUpdateLater ?
                        <TouchableOpacity style={styles.buttonLater} onPress={onPressLater}>
                            <Text style={styles.buttonLaterText}>{t('later')}</Text>
                        </TouchableOpacity>
                        : null}
                    <TouchableOpacity style={styles.buttonUpdate} onPress={goUpdate}>
                        <Text style={styles.buttonUpdateText}>{t('update')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenContainer>
    );
};
