import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize, scaleHorizontal, scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            padding: scaleHorizontal(16),
            backgroundColor: colors.card,
            marginHorizontal: scaleHorizontal(16),
            borderRadius: 12,
        },
        titleWrapper: {
            flex: 1,
        },
        title: {
            color: colors.regularText,
            fontSize: scaleFontSize(13),
            fontFamily: 'Roboto-Regular'
        },
        description: {
            color: colors.titleText,
            fontSize: scaleFontSize(13),
            fontFamily: 'Roboto-Light'
        },
        row: {
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: colors.shadow,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    });
    return styles;
}
