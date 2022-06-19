import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize, scaleHorizontal, scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            marginHorizontal: scaleHorizontal(16),
            marginVertical: scaleVertical(12),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: scaleVertical(50),
        },
        button: {
            height: scaleVertical(26),
            width: scaleHorizontal(44),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16
        },
        separator: {
            width: 1,
            height: '50%',
            backgroundColor: colors.shadow
        },
        periodText: {
            bottom: 2,
            color: colors.titleText,
            fontSize: scaleFontSize(15),
            fontFamily: 'Roboto-Regular'
        }
    });
    return styles;
}
