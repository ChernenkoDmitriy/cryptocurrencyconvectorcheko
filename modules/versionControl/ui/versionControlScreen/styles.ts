import { StyleSheet } from 'react-native';
import { IColors } from '../../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize, scaleHorizontal, scaleVertical } from '../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: scaleHorizontal(20)
        },
        logoImage: {
            width: scaleVertical(70),
            height: scaleVertical(70),
            marginBottom: scaleVertical(25)
        },
        title: {
            color: colors.titleText,
            textAlign: 'center',
            fontSize: scaleFontSize(20),
            fontFamily: 'Roboto-Regular',
            marginBottom: scaleVertical(10),
            fontWeight: '700'
        },
        subTitle: {
            color: colors.titleText,
            fontFamily: 'Roboto-Regular',
            textAlign: 'center',
            fontSize: scaleFontSize(16),
            marginBottom: scaleHorizontal(70)
        },
        buttonsWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%'
        },
        buttonUpdate: {
            height: scaleVertical(48),
            width: scaleHorizontal(100),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 7,
            backgroundColor: colors.buttonNumber,
        },
        buttonUpdateText: {
            color: colors.titleText,
            fontFamily: 'Roboto-Regular',
            fontSize: 16
        },
        buttonLater: {
            height: scaleVertical(48),
            width: scaleHorizontal(100),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 7,
            borderColor: colors.buttonNumber,
            borderWidth: 3
            // backgroundColor: colors.buttonNumber,
        },
        buttonLaterText: {
            color: colors.buttonNumber,
            fontFamily: 'Roboto-Regular',
            fontSize: 16
        }
    });
    return styles;
}