import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize, scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors, isActive: boolean) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.inputBackground,
            width: '100%',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            marginVertical: 5,
            flexDirection: 'row'
        },
        wrapper: {
            flexDirection: 'column',
            width: '85%'
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
            color: isActive ? colors.positiveRate : colors.negativeRate,
            marginBottom: 3
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
            color: colors.titleText,
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
        },
        containerLogo: {
            paddingVertical: 4,
            width: 25,
            alignItems: 'center',
            justifyContent: 'center'
        },
        logo: {
            width: scaleVertical(35),
            height: scaleVertical(35),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
        activeWrapper: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        deleteButtonWrapper: {
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '15%'
        }
    });
    return styles;
}
