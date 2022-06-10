import { StyleSheet } from 'react-native';
import { IColors } from '../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize, scaleVertical } from '../../../src/utils';

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
        containerLogo: {
            paddingVertical: 4,
            height: '100%',
            width: 70,
            alignItems: 'center',
            justifyContent: 'center'
        },
        logo: {
            width: scaleVertical(40),
            height: scaleVertical(26),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
        symbol: {
            marginTop: scaleVertical(15),
            color: colors.regularText,
            fontSize: scaleFontSize(18),
            lineHeight: scaleFontSize(22),
        },
        textWrapper: {
            flex: 1,
            alignItems: 'flex-end',
        },
        amountText: {
            color: colors.regularText,
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
