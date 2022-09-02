import { useCallback, useEffect } from "react";
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from "@react-navigation/native";
import semver from 'semver';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAppVersionsUseCase } from "../useCases/getAppVersionsUseCase";
import { isIOS } from "../../../src/utils";
import { appVersionModel } from "../../shared/entities/appVersion/AppVersion";


export const useVersionControl = () => {
    const navigation = useNavigation<any>();

    useEffect(() => {
        getAppVersionsUseCase().then((res) => {
            appVersionModel.appVersion = res;
            checkIsUpdateAvailable()
        })
    }, []);

    const getIsCanUpdate = async (minVersion: string, recommendedVersion: string) => {
        const skippedVersion = await AsyncStorage.getItem('RECOMMENDED_VERSION');
        let result = false;
        const isValid = semver.valid(minVersion) && semver.valid(recommendedVersion);
        const currentVersion = DeviceInfo.getVersion();
        if (isValid) {
            const isNeedShowRecordedUpdate = recommendedVersion === skippedVersion
                ? false
                : semver.gt(recommendedVersion, currentVersion);
            const isNeedShowForceUpdate = semver.gt(minVersion, currentVersion);

            result = isNeedShowRecordedUpdate || isNeedShowForceUpdate;
        }
        return result;
    }

    const checkIsUpdateAvailable = useCallback(async () => {
        try {
            const minVersion = isIOS ? appVersionModel.appVersion?.minIosVersion : appVersionModel.appVersion?.minAndroidVersion;
            const recommendedVersion = isIOS ? appVersionModel.appVersion?.recommendedIosVersion : appVersionModel.appVersion?.recommendedAndroidVersion;
            const isCanUpdate = await getIsCanUpdate(minVersion, recommendedVersion);
            if (isCanUpdate) {
                navigation.replace('VERSION_CONTROL_SCREEN');
            }
        } catch (error) {
            console.error('checkIsUpdateAvailable ', error);
        }
    }, [appVersionModel.appVersion?.minAndroidVersion, appVersionModel.appVersion?.minIosVersion, appVersionModel.appVersion?.recommendedAndroidVersion, appVersionModel.appVersion?.recommendedIosVersion]);

    return { checkIsUpdateAvailable };
}