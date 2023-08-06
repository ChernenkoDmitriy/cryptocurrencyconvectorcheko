import { StyleSheet } from 'react-native';
import { IColors } from '../../../../src/UIProvider/colors/IColorsController';
import { scaleHorizontal, scaleVertical } from '../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        background: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000059',
            flex: 1,
        },
        container: {
            backgroundColor: colors.card,
            borderRadius: 16,
            width: scaleHorizontal(310),
        },
        rowContainer: {
            paddingVertical: scaleVertical(16),
            paddingHorizontal: scaleHorizontal(16),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        titleWrapper: {
            paddingVertical: scaleVertical(16),
            paddingHorizontal: scaleHorizontal(16),
            justifyContent: 'center',
            alignItems: 'center',
        },
        separator: {
            height: 1,
            width: '100%',
            backgroundColor: colors.shadow + '1A',
        },
        text: {
            fontSize: 18,
            color: colors.titleText,
            fontWeight: '500',
            textAlign: 'center',
            marginHorizontal: scaleHorizontal(10),
        },
    });
    return styles;
}
