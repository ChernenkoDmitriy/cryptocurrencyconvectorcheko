import { useEffect, useState } from "react"
// import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

// const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-9751652427589478/4623350068';

// const interstitial = InterstitialAd.createForAdRequest(adUnitId);

// const ADDS_TOME_OFFSET_MS = 30000;

// export const useInterstitialAds = () => {
//     const [loaded, setLoaded] = useState(false);
//     const [isTimerGone, setIsTimerGone] = useState(false);

//     useEffect(() => {
//         const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => setLoaded(true));

//         interstitial.load();
//         const timer = setTimeout(() => {
//             setIsTimerGone(true);
//         }, ADDS_TOME_OFFSET_MS);
//         return () => {
//             clearTimeout(timer);
//             unsubscribe();
//         };
//     }, []);

//     useEffect(() => {
//         if (isTimerGone && loaded) {
//             interstitial?.show?.();
//         }
//     }, [isTimerGone, loaded]);

// }