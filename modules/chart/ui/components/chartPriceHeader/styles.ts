import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
        },
        price: {
            color: colors.titleText,
            fontSize: 32,
            lineHeight: 40,
            fontFamily: 'Roboto-Bold'
        },
        percentRate: {
            fontSize: 18,
            lineHeight: 22,
            fontFamily: 'Roboto-Regular'
        },
        logoWrapper: {
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center'
        },
        logo: {
            width: scaleVertical(32),
            height: scaleVertical(32),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
        },
    });
    return styles;
}
