import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize } from '../../../../../src/utils';

export const getStyle = (colors: IColors, isActive: boolean) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.inputBackground,
            width: '100%',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            marginVertical: 5,
        },
        rowWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10
        },
        coinImage: {
            backgroundColor: colors.accentColorLight,
            width: 30,
            height: 30,
            borderRadius: 50
        },
        rateWrapper: {
            alignItems: 'center'
        },
        isActiveText: {
            fontFamily: 'Roboto-Regular',
            color: isActive ? colors.activeColor : colors.unActiveColor
        },
        expectedPriceWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        expectedPriceContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        rateCodeText: {
            fontSize: scaleFontSize(16),
            color: colors.regularText,
            fontFamily: 'Roboto-Regular'
        },
        ratePriceText: {
            fontSize: scaleFontSize(14),
            color: colors.subText,
            fontFamily: 'Roboto-Regular'
        },
        expectedPriceText: {
            fontSize: scaleFontSize(14),
            color: colors.regularText,
            fontFamily: 'Roboto-Regular',
            marginLeft: 5
        },
        expectedPriceArrow: {
            marginRight: 5
        }
    });
    return styles;
}
