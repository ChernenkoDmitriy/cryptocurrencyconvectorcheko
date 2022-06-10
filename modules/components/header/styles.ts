import { StyleSheet } from 'react-native';
import { IColors } from '../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize, scaleHorizontal, scaleVertical } from '../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            height: scaleVertical(70),
            width: '100%',
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
            flexDirection: 'row',
        },
        button: {
            height: scaleVertical(70),
            width: scaleVertical(70),
            justifyContent: 'center',
            alignItems: 'center',
        },
        textWrapper: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: scaleHorizontal(70),
        },
        title: {
            color: colors.regularText,
            fontSize: scaleFontSize(24)
        }
    });
    return styles;
}
