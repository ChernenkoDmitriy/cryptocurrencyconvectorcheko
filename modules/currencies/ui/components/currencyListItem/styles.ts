import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleHorizontal, scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            height: scaleVertical(70),
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        logoContainer: {
            height: '100%',
            width: scaleVertical(80),
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        logo: {
            width: scaleVertical(24),
            height: scaleVertical(24),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
        textWrapper: {
            alignItems: 'flex-end',
            flex: 1,
            paddingHorizontal: 10,
        },
        name: {
            marginLeft: 10,
            color: colors.titleText,
            fontSize: 18,
            lineHeight: 22,
        },
        price: {
            color: colors.regularText,
            fontSize: 20,
            lineHeight: 24,
        },
    });
    return styles;
}
