import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
// import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';
import { useUiContext } from '../../../src/UIProvider';
// import { useInterstitialAds } from '../../presenter/useInterstitialAds';
import { getStyle } from './styles';

// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-9751652427589478/4814921750';

export const AdBanner: FC = () => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    // useInterstitialAds();

    return (
        <View style={styles.container}>
            {/* <BannerAd unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} /> */}
        </View>
    );
};

