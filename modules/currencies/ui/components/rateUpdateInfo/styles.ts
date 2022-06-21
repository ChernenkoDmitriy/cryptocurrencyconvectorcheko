import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../src/UIProvider/colors/IColorsController';
import { scaleFontSize, scaleVertical } from '../../../../../src/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            height: 60,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        rowWrapper: {
            flexDirection: 'row',
            justifyContent: 'center'
        },
        timeText: {
            fontSize: scaleFontSize(14),
            fontWeight: '400',
            marginHorizontal: 2,
            color: colors.accentText,
            marginVertical: scaleVertical(5),
        },
        rateText: {
            fontSize: scaleFontSize(16),
            fontWeight: '400',
            marginHorizontal: 2,
            color: colors.regularText
        },
        rateValueText: {
            fontSize: scaleFontSize(16),
            fontWeight: '400',
            marginHorizontal: 2,
            color: colors.regularText,
            overflow: 'hidden',
            maxWidth: '55%'
        }
    });
    return styles;
}
