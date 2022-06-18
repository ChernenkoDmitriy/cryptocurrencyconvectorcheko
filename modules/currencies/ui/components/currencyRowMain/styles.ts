import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize, scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        chartButton: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
        // containerLogo: {
        //     marginTop: scaleVertical(12),
        //     paddingVertical: 4,
        //     width: 70,
        //     alignItems: 'center',
        //     justifyContent: 'space-around',
        //     flexDirection: 'row',
        // },
        containerLogo: {
            marginTop: scaleVertical(12),
            paddingVertical: 4,
            width: 70,
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        logo: {
            width: scaleVertical(28),
            height: scaleVertical(28),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
        symbol: {
            color: colors.titleText,
            fontSize: scaleFontSize(14),
            lineHeight: scaleFontSize(18),
        },
        textWrapper: {
            flex: 1,
            alignItems: 'flex-end',
        },
        amountText: {
            color: colors.titleText,
            fontSize: scaleFontSize(30),
            lineHeight: scaleFontSize(34),
        },
        calculationText: {
            color: colors.regularText,
            fontSize: scaleFontSize(12),
            lineHeight: scaleFontSize(16),
            marginVertical: scaleVertical(4),
        },
    });
    return styles;
}
